# Module: editor（协作编辑壳层）

## Intent

组合 Yjs 同步、Slate 编辑器实例、插件管线与周边 UI（工具栏、光标层、表格菜单），作为应用入口 `CollaborativeEditor` 与主编辑画布 `Editor` 的宿主。

## User-visible behavior

- `CollaborativeEditor`：在 WebSocket 同步完成前展示 Loading；就绪后挂载 `Editor`。
- `Editor`：全屏纵向布局，顶部 `Toolbar`，主区域为带协作光标的可编辑文档；表格单元格上右键打开 `TableMenu`。

## Dependencies

- `core/plugins`：渲染与按键扩展。
- `core/tableConfig`：`slate-table` 的块类型映射。
- `../Cursors`、`../Toolbar`、`../TableMenu`：同级 UI 模块（避免经 barrel 导入以防循环依赖）。

## Boundaries / Non-goals

- 不包含业务持久化 API；「保存」行为由 `Toolbar` 当前实现与后续产品规格定义。
- 不包含 Yjs 服务端；仅客户端 `WebsocketProvider` 配置。

## Public API

- **Export**: `CollaborativeEditor`（default）— 应用级入口。
- **Export**: `Editor`（default，经 `CollaborativeEditor` 引用）— 需传入 `sharedType` 与 `provider`。
