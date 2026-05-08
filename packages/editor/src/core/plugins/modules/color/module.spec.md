# Module: color（文本颜色 leaf）

本目录：`index.tsx` 为实现，本文件为 SDD 规格。

## Intent

为文本 leaf 上的 `color` 与 `backgroundColor` 提供独立渲染层，通过内联 `style` 覆盖前景/背景色；当无颜色相关 mark 时交回链路由其它插件处理。

## User-visible behavior

- 若 leaf 含 `color` / `backgroundColor`，渲染带内联样式的 `<span>`；否则返回 `undefined`。
- **注意**：`plugins` 中 `BasePlugin` 先于本插件执行且其 `renderLeaf` 总会返回节点时，本插件的 `renderLeaf` 可能不会被调用；保留本插件用于契约清晰或后续调整插件顺序/拆分 Base leaf 逻辑。

## Dependencies

- `slate-react`：`RenderLeafProps`。
- `../base`：`EditorPlugin`。

## Boundaries / Non-goals

- 不负责调色板 UI（由 Toolbar 颜色按钮负责）。
- 与 `BasePlugin.renderLeaf` 中行内样式并存时，以插件注册顺序为准；变更时需检查叠加表现。

## Public API

- **Export**: `ColorPlugin`。
