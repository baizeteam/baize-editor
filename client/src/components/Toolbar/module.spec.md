# Module: Toolbar

## Intent

为富文本编辑器提供格式化与插入能力的主工具条：文本样式、列表、引用、颜色、图片 URL 插入、表格插入、标题级别切换、字数展示与保存入口。

## User-visible behavior

- 提供粗体/斜体/下划线/删除线、前景色与背景色。
- 支持无序/有序列表、引用块。
- 通过弹层输入图片 URL 并插入；一键插入默认表格。
- 标题下拉在 H1–H6 与正文之间切换。
- 展示当前文档字符数；提供保存按钮（当前实现为控制台输出子节点，属过渡行为）。

## Dependencies

- `slate` / `slate-react`：当前编辑器实例、节点变换。
- `antd`：按钮、下拉、气泡等。
- 项目内 `core/plugins/modules/{list,image}`：列表切换、`insertImage` 等。
- 样式：`styles.ts`、`index.less`；Tailwind 类名合并见 `modules/cn.ts`。
- `modules/toolbar-editor.ts`：与 Slate 相关的纯函数（块/标记查询与切换、标题菜单、字数），无 React 依赖。

## Boundaries / Non-goals

- 不承担服务端持久化协议定义；「保存」的具体契约由上层产品规格约定。
- 不内置图片上传服务，仅 URL 插入。

## Public API

- **Export**: `Toolbar` — 无 props，依赖 `useSlate()` 上下文。

## Subcomponents（`modules/`）

- `ColorPickerButton.tsx`：颜色类 mark 切换。
- `MarkButton` / `BlockButton` / `ListButton`：格式化与列表按钮。
- `ImageInsertButton.tsx`：图片 URL 弹层与插入。
- `InsertTableButton.tsx`：插入默认表格。
- `HeadingDropdown.tsx`：标题级别下拉。
- `ToolbarRight.tsx`：字数与保存。
