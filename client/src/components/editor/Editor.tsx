import React, { useCallback, useMemo, useEffect, useState } from "react";
import {
  createEditor,
  Descendant,
  Editor,
  Element as SlateElement,
  Path,
  Transforms,
} from "slate";
import {
  Slate,
  Editable,
  withReact,
  RenderElementProps,
  RenderLeafProps,
} from "slate-react";
import { withHistory } from "slate-history";
import type { Awareness } from "y-protocols/awareness";
import { withYjs, withCursors, YjsEditor } from "@slate-yjs/core";
import { withTable } from "slate-table";
import { plugins } from "../../core/plugins";
import { Cursors } from "../Cursors";
import { Toolbar } from "../Toolbar";
import TableMenu from "../TableMenu";
import { initialValue } from "./data";
import { randomColor } from "../../helpers";
import { tableConfig } from "../../core/tableConfig";
import { useCollabSession } from "./CollabSessionContext";
import { HelpDrawer } from "../HelpDrawer";

// ✅ Slate 必须兜底
const EMPTY_VALUE: Descendant[] = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];

type EditorProps = {
  sharedType: any;
  awareness: Awareness;
  cursorDisplayName: string;
};

const EditorComponent: React.FC<EditorProps> = ({
  sharedType,
  awareness,
  cursorDisplayName,
}) => {
  const { canEdit, sessionRole } = useCollabSession();
  /**
   * ✅ 创建 editor
   */
  const editor = useMemo(() => {
    console.log("🟢 create editor");
    let e = withHistory(
      withTable(
        withCursors(withReact(withYjs(createEditor(), sharedType)), awareness, {
          data: {
            name: cursorDisplayName,
            color: randomColor(),
            sessionRole,
          },
        }),
        tableConfig,
      ),
    );

    const { isInline } = e;
    e.isInline = (element) =>
      element.type === "badge" ? true : isInline(element);

    plugins.forEach((plugin) => {
      if (plugin.withPlugin) {
        e = plugin.withPlugin(e);
      }
    });

    const { normalizeNode } = e;
    e.normalizeNode = (entry, options) => {
      const [node] = entry;

      if (!Editor.isEditor(node) || node.children.length > 0) {
        return normalizeNode(entry, options);
      }

      Transforms.insertNodes(editor, initialValue, { at: [0] });
    };

    return e;
  }, [sharedType, awareness, cursorDisplayName, sessionRole]);

  useEffect(() => {
    YjsEditor.connect(editor);
    return () => YjsEditor.disconnect(editor);
  }, [editor]);

  useEffect(() => {
    if (!canEdit) {
      setContextMenu(null);
    }
  }, [canEdit]);

  /** 访客只读时禁止 Slate/DOM 选区，避免仍可拖选、全选等 */
  useEffect(() => {
    if (canEdit) return;
    Transforms.deselect(editor);
    const dom = window.getSelection?.();
    dom?.removeAllRanges();
  }, [canEdit, editor]);

  /**
   * UI
   */
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    visible: boolean;
    path?: Path;
  } | null>(null);

  const blockGuestSelectKeys = (e: React.KeyboardEvent) => {
    if (e.ctrlKey || e.metaKey) {
      const k = e.key.toLowerCase();
      if (k === "a" || k === "c" || k === "x") {
        e.preventDefault();
      }
    }
    if (
      e.shiftKey &&
      [
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown",
        "Home",
        "End",
        "PageUp",
        "PageDown",
      ].includes(e.key)
    ) {
      e.preventDefault();
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    if (!canEdit) {
      setContextMenu(null);
      return;
    }
    const [cell] = Editor.nodes(editor, {
      match: (n) =>
        SlateElement.isElement(n) &&
        (n.type === "table-cell" || n.type === "header-cell"),
    });

    if (cell) {
      e.preventDefault();
      setContextMenu({
        x: e.clientX,
        y: e.clientY,
        visible: true,
        path: cell[1],
      });
    } else {
      setContextMenu(null);
    }
  };

  const renderElement = useCallback(
    (props: RenderElementProps) => {
      for (const plugin of plugins) {
        const el = plugin.renderElement?.(props);
        if (el) return el;
      }
      return <p {...props.attributes}>{props.children}</p>;
    },
    [plugins],
  );

  const renderLeaf = useCallback(
    (props: RenderLeafProps) => {
      for (const plugin of plugins) {
        const leaf = plugin.renderLeaf?.(props);
        if (leaf) return leaf;
      }
      return <span {...props.attributes}>{props.children}</span>;
    },
    [plugins],
  );

  return (
    <div className="min-h-screen flex flex-col items-center pb-0 md:pb-20">
      <Slate editor={editor} initialValue={EMPTY_VALUE}>
        <Toolbar />
        <Cursors>
          <div className="max-w-4xl w-full bg-white min-h-screen p-8 relative">
            <Editable
              readOnly={!canEdit}
              renderElement={renderElement}
              renderLeaf={renderLeaf}
              placeholder="Start writing..."
              className={`outline-none focus:outline-none focus-visible:outline-none ring-0 focus:ring-0 focus-visible:ring-0${!canEdit ? " select-none cursor-default" : ""}`}
              spellCheck={false}
              autoFocus={canEdit}
              onContextMenu={handleContextMenu}
              onClick={() => setContextMenu(null)}
              onDoubleClick={(e) => !canEdit && e.preventDefault()}
              onDragStart={(e) => !canEdit && e.preventDefault()}
              onCopy={(e) => !canEdit && e.preventDefault()}
              onCut={(e) => !canEdit && e.preventDefault()}
              onSelect={() => {
                if (!canEdit) {
                  Transforms.deselect(editor);
                  window.getSelection()?.removeAllRanges();
                }
              }}
              onKeyDown={(event) => {
                if (!canEdit) {
                  blockGuestSelectKeys(event);
                  return;
                }
                for (const plugin of plugins) {
                  plugin.onKeyDown?.(event, editor);
                }
              }}
            />

            <TableMenu
              editor={editor}
              contextMenu={contextMenu}
              setContextMenu={setContextMenu}
            />
          </div>
        </Cursors>
      </Slate>
      <HelpDrawer />
    </div>
  );
};

export default EditorComponent;
