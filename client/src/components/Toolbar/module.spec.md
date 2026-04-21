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
- 项目内 `editor/plugins`：列表、图片、表格辅助逻辑。
- 样式：`styles.ts`、`index.less`、Tailwind 工具类（`cn`）。

## Boundaries / Non-goals

- 不承担服务端持久化协议定义；「保存」的具体契约由上层产品规格约定。
- 不内置图片上传服务，仅 URL 插入。

## Public API

- **Export**: `Toolbar` — 无 props，依赖 `useSlate()` 上下文。

## Subcomponents

- `ColorPickerButton.tsx`：颜色类 mark 切换，仅供 Toolbar 内部使用。
