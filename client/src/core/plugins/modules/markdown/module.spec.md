# Module: markdown（类 Markdown 快捷键）

本目录：`index.tsx` 为实现，本文件为 SDD 规格。

## Intent

在编辑区通过行首字符与空格/回车，将当前行转换为标题、引用、列表等块类型（类 CommonMark 行首触发），减少依赖工具栏的操作路径。

## User-visible behavior

- **Enter**：在行首为 `#` … `######` 时转为对应 heading 并删除触发字符；`>` 转引用；`-` 转无序列表项并包裹列表；纯数字行转有序列表项等（详见实现分支）。
- **空格**：部分与 Enter 相同的「行首前缀 + 空格」转换。
- 对非空块标题等存在空块回车退段逻辑。

## Dependencies

- `slate`：`Editor`、`Transforms`、`Text`、`Element`。
- `../base`：`EditorPlugin`。

## Boundaries / Non-goals

- 不是完整 Markdown 解析器；仅覆盖编辑器内快捷转换。
- 与 `MarkdownPlugin` / `BasePlugin` 顺序及 `onKeyDown` 链式调用有关，修改时需回归标题与列表场景。

## Public API

- **Export**: `MarkdownPlugin`。
