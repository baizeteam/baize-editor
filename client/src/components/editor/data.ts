import { Descendant } from "slate";

export const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [
      { text: " " },
      { type: "badge", children: [{ text: "白泽开源团队" }] } as any,
      { text: " " },
      { type: "badge", children: [{ text: "协同编辑" }] } as any,
      { text: " " },
    ],
  },
  {
    type: "heading-one",
    children: [{ text: "白泽编辑器 — 富文本协同编辑" }],
  },
  {
    type: "paragraph",
    children: [
      { text: "白泽编辑器是一个基于 " },
      { text: "Slate", bold: true },
      { text: " 和 " },
      { text: "Yjs", bold: true },
      {
        text: " 构建的实时富文本协同编辑器。多人可以同时编辑同一篇文档，所有变更通过 ",
      },
      { text: "CRDT", code: true },
      { text: " 算法自动合并，无需手动解决冲突。" },
    ],
  },
  {
    type: "heading-two",
    children: [{ text: "核心特性" }],
  },
  {
    type: "bulleted-list",
    children: [
      {
        type: "list-item",
        children: [{ text: "实时多人协同编辑，基于 Yjs CRDT 同步" }],
      },
      {
        type: "list-item",
        children: [{ text: "插件化架构，每个功能独立为一个 EditorPlugin" }],
      },
      {
        type: "list-item",
        children: [{ text: "Markdown 快捷键：标题、引用、列表、徽章" }],
      },
      {
        type: "list-item",
        children: [{ text: "表格支持：合并单元格、右键菜单操作" }],
      },
      {
        type: "list-item",
        children: [{ text: "访客权限控制：管理员可切换只读/可编辑" }],
      },
    ],
  },
  {
    type: "heading-two",
    children: [{ text: "插件一览" }],
  },
  {
    type: "table",
    children: [
      {
        type: "table-header",
        children: [
          {
            type: "table-row",
            children: [
              {
                type: "header-cell",
                children: [{ text: "插件", bold: true }] as any,
              },
              {
                type: "header-cell",
                children: [{ text: "职责", bold: true }] as any,
              },
              {
                type: "header-cell",
                children: [{ text: "快捷方式", bold: true }] as any,
              },
            ],
          },
        ],
      },
      {
        type: "table-body",
        children: [
          {
            type: "table-row",
            children: [
              { type: "table-cell", children: [{ text: "BasePlugin" }] as any },
              {
                type: "table-cell",
                children: [
                  {
                    text: "段落、标题、引用、行内样式（粗体/斜体/下划线/删除线/代码）",
                  },
                ] as any,
              },
              {
                type: "table-cell",
                children: [{ text: "无" }] as any,
              },
            ],
          },
          {
            type: "table-row",
            children: [
              {
                type: "table-cell",
                children: [{ text: "BadgePlugin" }] as any,
              },
              {
                type: "table-cell",
                children: [
                  { text: "行内徽章元素，支持插入、删除、工具栏切换" },
                ] as any,
              },
              {
                type: "table-cell",
                children: [{ text: "`文字` + 空格" }] as any,
              },
            ],
          },
          {
            type: "table-row",
            children: [
              {
                type: "table-cell",
                children: [{ text: "ColorPlugin" }] as any,
              },
              {
                type: "table-cell",
                children: [{ text: "文字颜色与背景颜色" }] as any,
              },
              {
                type: "table-cell",
                children: [{ text: "无" }] as any,
              },
            ],
          },
          {
            type: "table-row",
            children: [
              { type: "table-cell", children: [{ text: "ListPlugin" }] as any },
              {
                type: "table-cell",
                children: [{ text: "有序列表、无序列表、回车自动续行" }] as any,
              },
              {
                type: "table-cell",
                children: [{ text: "- 或 1. + 空格" }] as any,
              },
            ],
          },
          {
            type: "table-row",
            children: [
              {
                type: "table-cell",
                children: [{ text: "MarkdownPlugin" }] as any,
              },
              {
                type: "table-cell",
                children: [
                  { text: "标题、引用、列表、徽章的键盘快捷转换" },
                ] as any,
              },
              {
                type: "table-cell",
                children: [{ text: "略" }] as any,
              },
            ],
          },
          {
            type: "table-row",
            children: [
              {
                type: "table-cell",
                children: [{ text: "TablePlugin" }] as any,
              },
              {
                type: "table-cell",
                children: [{ text: "表格插入、合并单元格、右键菜单" }] as any,
              },
              {
                type: "table-cell",
                children: [{ text: "无" }] as any,
              },
            ],
          },
          {
            type: "table-row",
            children: [
              {
                type: "table-cell",
                children: [{ text: "ImagePlugin" }] as any,
              },
              {
                type: "table-cell",
                children: [{ text: "图片插入与拖拽调整宽度" }] as any,
              },
              {
                type: "table-cell",
                children: [{ text: "无" }] as any,
              },
            ],
          },
        ],
      },
    ],
  } as any,
  {
    type: "heading-two",
    children: [{ text: "技术栈" }],
  },
  {
    type: "numbered-list",
    children: [
      {
        type: "list-item",
        children: [
          { text: "Slate", bold: true },
          { text: " — 可扩展的富文本编辑框架" },
        ],
      },
      {
        type: "list-item",
        children: [
          { text: "Yjs", bold: true },
          { text: " — 基于 CRDT 的实时协同引擎" },
        ],
      },
      {
        type: "list-item",
        children: [
          { text: "React", bold: true },
          { text: " + ", code: true },
          { text: "TypeScript", bold: true },
          { text: " — 前端框架与类型安全" },
        ],
      },
      {
        type: "list-item",
        children: [
          { text: "Tailwind CSS", bold: true },
          { text: " — 原子化样式" },
        ],
      },
    ],
  },
  {
    type: "heading-two",
    children: [{ text: "设计理念" }],
  },
  {
    type: "block-quote",
    children: [
      {
        text: "「最好的编辑器，是在你开始书写的那一刻便隐于无形的那一个。」",
      },
    ],
  },
  {
    type: "paragraph",
    children: [
      { text: "白泽编辑器遵循" },
      { text: "极简界面", color: "#6750A4" },
      {
        text: "的设计原则：通过微妙的色调层次——从纯净画布到环境层的表面容器——引导视线自然穿过层级结构，而不会因技术网格产生视觉疲劳。每个插件只做一件事，做到极致。",
      },
    ],
  },
];
