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
import { withYjs, withCursors, YjsEditor } from "@slate-yjs/core";
import { withTable } from "slate-table";
import { Cursors } from "../components/Cursors";
import { plugins } from "./plugins";
import { Toolbar } from "../components/Toolbar";
import TableMenu from "../components/TableMenu";
import { initialValue } from "./data";
import { randomColor, generateId } from "../helpers";
import { tableConfig } from "../helpers/editor";

// ✅ Slate 必须兜底
const EMPTY_VALUE: Descendant[] = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];

const EditorComponent: React.FC<any> = ({ sharedType, provider }) => {
  /**
   * ✅ 创建 editor
   */
  const editor = useMemo(() => {
    console.log("🟢 create editor");
    let e = withHistory(
      withTable(
        withCursors(
          withReact(withYjs(createEditor(), sharedType)),
          provider.awareness,
          {
            data: {
              name: "用户" + generateId(),
              color: randomColor(),
            },
          },
        ),
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
  }, [sharedType, provider]);

  useEffect(() => {
    YjsEditor.connect(editor);
    return () => YjsEditor.disconnect(editor);
  }, [editor]);

  /**
   * UI
   */
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    visible: boolean;
    path?: Path;
  } | null>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
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
    <div className="min-h-screen flex flex-col items-center pb-20">
      <Slate editor={editor} initialValue={EMPTY_VALUE}>
        <Toolbar />
        <Cursors>
          <div className="max-w-4xl w-full bg-white min-h-screen p-8 mt-4 relative">
            <Editable
              renderElement={renderElement}
              renderLeaf={renderLeaf}
              placeholder="Start writing..."
              className="outline-none"
              spellCheck={false}
              autoFocus
              onContextMenu={handleContextMenu}
              onClick={() => setContextMenu(null)}
              onKeyDown={(event) => {
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
    </div>
  );
};

export default EditorComponent;
