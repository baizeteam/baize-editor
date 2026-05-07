# Module: table（表格渲染与结构操作）

本目录：`index.tsx` 为实现，本文件为 SDD 规格。

## Intent

将 `slate-table` 定义的表格节点渲染为 HTML 表格（含表头/表体/表尾、行、单元格），并暴露行列与整表的结构化插入、删除 API，供工具栏与右键菜单调用。

## User-visible behavior

- `table` / `table-header` / `table-body` / `table-footer` / `table-row` / `header-cell` / `table-cell` 输出对应 `<table>` 子树；单元格选中态与 `TableCursor` 联动。
- 表格在选区拖拽时应用 `table-selection-none` 等类名，避免冲突。

## Dependencies

- `slate-react`、`slate-table`：`TableCursor`、`TableEditor`。
- `../base`：`EditorPlugin`。

## Boundaries / Non-goals

- 不实现右键菜单 UI（由 `TableMenu` 组件负责）。
- 不修改 `core/tableConfig.ts`；表格块名与全局配置保持一致。

## Public API

- **Export**: `TablePlugin`。
- **Export**: `insertTable`、`addRow`、`deleteRow`、`addColumn`、`deleteColumn`、`deleteTable`（对 `TableEditor` 的封装）。
