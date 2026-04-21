# Feature Specification: client/src/components 组件层

**Feature Branch**: `001-client-components`  
**Created**: 2026-04-21  
**Status**: Active  
**Input**: 将编辑器 UI 组件按 Spec-Driven Development（与 spec-kit 对齐）组织，保证意图可追溯、边界清晰。

## 范围说明

本规格描述 `client/src/components` **目录级**约定：模块划分、规格文件位置、公开 API 与质量门禁。具体交互细节以各子目录下的 `module.spec.md` 为准。

**布局说明**：协作编辑壳层位于 `components/editor/`（`CollaborativeEditor`、`Editor`、示例 `data`）；Slate 插件与文档类型在 `client/src/core/`（原 `editor/plugins` 与类型/table 配置），与 UI 解耦。

## User Scenarios & Testing

### User Story 1 - 从规格理解组件职责 (Priority: P1)

开发者在不读实现代码的情况下，能通过 `module.spec.md` 与各模块的公开导出，理解组件的用户意图、依赖与边界。

**Why this priority**: SDD 的核心是「规格先于实现」且可演进。

**Independent Test**: 新成员仅阅读 `specs/001-client-components/spec.md` 与三个 `module.spec.md`，能说明各模块职责且无矛盾。

**Acceptance Scenarios**:

1. **Given** 仓库已包含组件规格，**When** 打开任一 `module.spec.md`，**Then** 其中包含 Intent、行为摘要、依赖与公开 API 段落。
2. **Given** 新增组件子目录，**When** 合入主分支，**Then** 该目录包含 `module.spec.md` 且根 `index` 导出已登记在 `client/src/components/index.ts`。

---

### User Story 2 - 稳定公开 API (Priority: P2)

业务侧（如 `Editor.tsx`）通过 `../components` 统一入口引用组件，避免深层路径散落。

**Why this priority**: 降低重构成本，明确「对外契约」。

**Independent Test**: 仅改子目录内部文件路径时，`index.ts` 与 `module.spec.md` 中 Public API 段同步更新后，外部引用仍可通过 barrel 工作。

**Acceptance Scenarios**:

1. **Given** `client/src/components/index.ts` 存在，**When** 从 `editor` 引用组件，**Then** 优先使用 `from "../components"`（或项目统一别名）。

---

## Requirements

### Functional

- FR-001: 每个一级子目录（一个 UI 模块）必须包含 `module.spec.md`，结构与模板见 `.specify/templates` 或本目录内示例。
- FR-002: 模块对外导出必须通过 `client/src/components/index.ts` 聚合（barrel）；子路径仅用于模块内部或过渡期，新代码不应新增对外深层 import。
- FR-003: 模块内协同时变文件与 `index` 入口同层或子路径共置（样式 `.less` / `styles.ts` 等保持与现有 Toolbar 一致）。

### Non-Functional

- NFR-001: `module.spec.md` 使用中文描述用户可见行为与技术依赖，便于与团队 constitution 对齐。
- NFR-002: 变更用户可见行为时，须先更新对应 `module.spec.md`（或与 PR 同批修改）。

## Success Criteria

- [x] 三个现有模块（Cursors、Toolbar、TableMenu）均具备 `module.spec.md`。
- [x] `specs/001-client-components/spec.md` 与 Cursor 规则 `client-components-sdd.mdc` 描述一致。
- [x] `Editor.tsx` 通过 barrel 引用组件。

## References

- `.specify/memory/constitution.md` — 项目级原则（待团队填全）。
- 各模块 `client/src/components/<Module>/module.spec.md`。
