import {
  addRow,
  deleteRow,
  addColumn,
  deleteColumn,
  deleteTable,
} from "../../core/plugins/modules/table";
import { TableEditor } from "slate-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useCollabSession } from "../editor/CollabSessionContext";
import type { Editor } from "slate";

type ContextMenu = { visible: boolean; x: number; y: number } | null;

type TableMenuProps = {
  editor: Editor;
  contextMenu: ContextMenu;
  setContextMenu: (menu: ContextMenu) => void;
};

export default function TableMenu({ editor, contextMenu, setContextMenu }: TableMenuProps) {
  const { canEdit } = useCollabSession();

  if (!canEdit) {
    return null;
  }

  return (
    <>
      {contextMenu && contextMenu.visible && (
        <div
          className="fixed z-[100]"
          style={{ left: contextMenu.x, top: contextMenu.y }}
        >
          <DropdownMenu
            open={true}
            onOpenChange={(open) => !open && setContextMenu(null)}
          >
            <DropdownMenuTrigger asChild>
              <div />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-[180px]">
              <DropdownMenuItem
                disabled={!TableEditor.canMerge(editor)}
                onClick={() => {
                  TableEditor.merge(editor);
                  setContextMenu(null);
                }}
              >
                合并单元格
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  TableEditor.split(editor);
                  setContextMenu(null);
                }}
              >
                拆分单元格
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  addRow(editor, "above");
                  setContextMenu(null);
                }}
              >
                在上方插入行
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  addRow(editor, "below");
                  setContextMenu(null);
                }}
              >
                在下方插入行
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  addColumn(editor, "left");
                  setContextMenu(null);
                }}
              >
                在左侧插入列
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  addColumn(editor, "right");
                  setContextMenu(null);
                }}
              >
                在右侧插入列
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => {
                  deleteRow(editor);
                  setContextMenu(null);
                }}
              >
                删除行
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => {
                  deleteColumn(editor);
                  setContextMenu(null);
                }}
              >
                删除列
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => {
                  deleteTable(editor);
                  setContextMenu(null);
                }}
              >
                删除表格
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </>
  );
}
