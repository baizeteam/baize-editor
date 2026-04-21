# Module: image（图片块与插入）

本目录：`index.tsx` 为实现，本文件为 SDD 规格。

## Intent

将 `image` 类型节点渲染为可调整宽度的行内块级图片；将图片视为 void 节点；提供 `insertImage` 供工具栏在选区插入图片并在其后补空段落。

## User-visible behavior

- 展示 `url` 指向的图片，默认宽度 400px，可拖拽右下角调整宽度并写回节点 `width`。
- 选中且聚焦时显示高亮与缩放手柄；缩放时显示像素提示。
- 插入后在图片后再插入空 `paragraph`，保证光标可继续输入。

## Dependencies

- `slate` / `slate-react`：`Transforms`、`ReactEditor`、`useSlateStatic` 等。
- `../base`：`EditorPlugin`。
- `../../../types`：`ImageElement`。

## Boundaries / Non-goals

- 不上传文件、不校验 URL 可达性；仅展示给定 URL。
- 无障碍：`alt` 当前为空字符串，产品层若需可后续改为可编辑字段。

## Public API

- **Export**: `ImagePlugin`。
- **Export**: `insertImage(editor, url)`。
