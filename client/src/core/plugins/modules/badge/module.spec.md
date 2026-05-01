# Module: badge（徽章行内元素）

本目录：`index.tsx` 为实现，本文件为 SDD 规格。

## Intent

提供「徽章」行内元素的渲染与键盘交互，支持工具栏按钮插入和 Markdown 快捷方式（`` `xxx ` `` + 空格）触发。

## User-visible behavior

- **渲染**：badge 作为 inline element 渲染为带圆角的标签样式（`bg-primary-container`、小号大写字母）。
- **工具栏**：选中文字后点击「徽章」按钮，文字被包裹为 badge 并在两侧插入空格；再次点击解除。
- **快捷方式**：输入 `` `文字 `` 或 `` `文字` `` 后按空格，自动转换为 badge 元素。
- **Backspace**：
  - 光标在 badge 后面（offset 0，前一个兄弟是 badge）→ 删除整个 badge。
  - 光标在 badge 开头且有内容 → 删除整个 badge。
  - 光标在空 badge 内 → 移除 badge 节点。

## Dependencies

- `slate`：`Editor`、`Transforms`、`Element`、`Path`。
- `slate-react`：`RenderElementProps`。
- `../base`：`EditorPlugin`。

## Boundaries / Non-goals

- 不处理跨行 badge；badge 内容为单行纯文本。
- 渲染由本插件 `renderElement` 负责，不依赖 `BasePlugin`。

## Public API

- **Export**: `BadgePlugin`（`EditorPlugin` 实例）。
