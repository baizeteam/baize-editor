# Module: Cursors

## Intent

在协作编辑场景中，将远端用户的光标与选区可视化叠加在编辑器容器内，使多人同时编辑时的注意力位置可感知。

## User-visible behavior

- 在可滚动/可布局的容器内渲染子内容，并在其上方绘制其他协作者的选区矩形与光标（caret）。
- 选区使用协作者颜色半透明填充；光标处展示协作者名称标签（若 `data` 提供）。

## Dependencies

- `@slate-yjs/react`：`useRemoteCursorOverlayPositions`、光标 overlay 数据类型。
- React：`useRef` 与 children 组合容器。

## Boundaries / Non-goals

- 不负责 Yjs 连接、权限或用户列表；仅消费 overlay 数据并展示。
- 不实现本地选区高亮（由 Slate/Editable 负责）。

## Public API

- **Export**: `Cursors` — 包装子节点的容器组件，内部渲染远程光标层。
