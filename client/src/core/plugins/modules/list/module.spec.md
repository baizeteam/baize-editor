# Module: list（有序/无序列表）

本目录：`index.tsx` 为实现，本文件为 SDD 规格。

## Intent

渲染 `bulleted-list`、`numbered-list`、`list-item` 为语义化列表；在空列表项上按 Enter 时退出列表或拆段；提供 `toggleList` 供工具栏切换列表类型。

## User-visible behavior

- `ul` / `ol` / `li` 带基础列表样式类。
- 光标在空的 `list-item` 上按 Enter：解除列表或仅将当前项改为段落，行为依赖父列表子项数量。

## Dependencies

- `slate` / `slate-react`：`Editor`、`Transforms`、`RenderElementProps`。
- `../base`：`EditorPlugin`。

## Boundaries / Non-goals

- 不实现 Tab 缩进多级嵌套列表的完整大纲逻辑（当前以 Slate 节点结构为准）。
- `toggleList` 与工具栏联动；不在此模块内处理 UI。

## Public API

- **Export**: `ListPlugin`。
- **Export**: `toggleList(editor, format)`（`bulleted-list` | `numbered-list`）。
