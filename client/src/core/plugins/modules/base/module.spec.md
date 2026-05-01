# Module: base（插件契约与基础块渲染）

本目录：`index.tsx` 为实现，本文件为 SDD 规格。

## Intent

定义 `EditorPlugin` 接口，并提供「段落、标题 H1–H6、引用」等基础块级与行内（leaf）的默认渲染与样式，作为其它插件的契约基线。

## User-visible behavior

- 块：`paragraph`、`heading-one` … `heading-six`、`block-quote` 使用语义化标签与 Tailwind 类展示。
- 行内：支持 `bold` / `italic` / `underline` / `strikethrough` / `code`；`CustomText` 的 `color` / `backgroundColor` 及 `color === 'secondary'` 的展示类名在同一 `renderLeaf` 中输出。
- 无 `onKeyDown` / `withPlugin`。

## Dependencies

- `slate-react`：`RenderElementProps` / `RenderLeafProps`。
- `../../../types`：`CustomText`。
- `clsx` + `tailwind-merge`：类名合并。

## Boundaries / Non-goals

- 不负责表格、列表、图片等结构；未匹配的 `element.type` 返回 `undefined`，由后续插件或 `Editor` 兜底。
- 不扩展 Slate `Editor` 实例（无 `withPlugin`）。

## Public API

- **Export**: `EditorPlugin`（接口）、`BasePlugin`（`EditorPlugin` 实例）。
