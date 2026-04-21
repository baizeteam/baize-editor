# Specification: core/plugins/modules（Slate 插件层）

**Branch / ID**: `002-core-plugins-modules`  
**Status**: Active  

## 范围

本条目跟踪 `client/src/core/plugins/modules/` 下各 Slate 插件的 SDD 约定：每个插件为**独立子目录**，内含 `index.tsx` 与 `module.spec.md`，门禁见 `.cursor/rules/core-plugins-modules-sdd.mdc`。

## 成功标准

- [x] `base`、`table`、`color`、`image`、`list`、`markdown` 各目录均具备 `index.tsx` + `module.spec.md`。
- [x] Cursor 规则 `core-plugins-modules-sdd.mdc` 与上述结构一致。

## References

- `client/src/core/plugins/index.ts` — 插件顺序与导出。
- `client/src/core/types.ts` — 自定义节点与文本类型。
