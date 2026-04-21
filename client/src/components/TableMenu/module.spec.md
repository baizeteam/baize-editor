# Module: TableMenu

## Intent

在表格上通过上下文菜单提供单元格合并/拆分、行列增删与整表删除等操作，与 `slate-table` 能力对齐。

## User-visible behavior

- 当 `contextMenu` 可见时，在屏幕坐标 `(x, y)` 处展示 Ant Design 菜单。
- 菜单项根据当前表格状态启用/禁用（如合并仅在可合并时可用）。
- 执行任一操作后关闭菜单（`setContextMenu(null)`）。

## Dependencies

- `slate-table`：`TableEditor` 合并/拆分能力判断与执行。
- 项目内 `core/plugins/table`：`addRow`、`deleteRow`、`addColumn`、`deleteColumn`、`deleteTable`。
- `antd`：`Dropdown` 与菜单项。

## Boundaries / Non-goals

- 不负责触发右键菜单的命中检测与 `contextMenu` 状态机；由父组件传入。
- 不渲染表格本体，仅渲染浮动菜单层。

## Public API

- **Export**: `TableMenu`（default）— props：`editor`、`contextMenu`、`setContextMenu`。
