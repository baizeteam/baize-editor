import { Descendant } from "slate";

export const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [
      { type: "badge", children: [{ text: "文章" }] } as any,
      { text: " 4 小时前修改", color: "secondary" } as any,
    ],
  },
  {
    type: "heading-one",
    children: [{ text: "极简界面的架构设计" }],
  },
  {
    type: "table",
    children: [
      {
        type: "table-body",
        children: [
          {
            type: "table-row",
            children: [
              {
                type: "table-cell",
                children: [
                  {
                    type: "paragraph",
                    children: [
                      {
                        text: "",
                      },
                    ],
                  },
                  {
                    type: "paragraph",
                    children: [
                      {
                        text: "",
                      },
                    ],
                  },
                ],
                colSpan: 2,
              },
              {
                type: "table-cell",
                children: [
                  {
                    type: "paragraph",
                    children: [
                      {
                        text: "",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "table-row",
            children: [
              {
                type: "table-cell",
                children: [
                  {
                    type: "paragraph",
                    children: [
                      {
                        text: "",
                      },
                    ],
                  },
                ],
              },
              {
                type: "table-cell",
                children: [
                  {
                    type: "paragraph",
                    children: [
                      {
                        text: "",
                      },
                    ],
                  },
                ],
              },
              {
                type: "table-cell",
                children: [
                  {
                    type: "paragraph",
                    children: [
                      {
                        text: "",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "table-row",
            children: [
              {
                type: "table-cell",
                children: [
                  {
                    type: "paragraph",
                    children: [
                      {
                        text: "",
                      },
                    ],
                  },
                ],
              },
              {
                type: "table-cell",
                children: [
                  {
                    type: "paragraph",
                    children: [
                      {
                        text: "",
                      },
                    ],
                  },
                ],
              },
              {
                type: "table-cell",
                children: [
                  {
                    type: "paragraph",
                    children: [
                      {
                        text: "",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    type: "table",
    children: [
      {
        type: "table-body",
        children: [
          {
            type: "table-row",
            children: [
              { type: "table-cell", children: [{ text: "组件" }] as any },
              { type: "table-cell", children: [{ text: "作用" }] as any },
            ],
          },
          {
            type: "table-row",
            children: [
              { type: "table-cell", children: [{ text: "排版" }] as any },
              { type: "table-cell", children: [{ text: "结构" }] as any },
            ],
          },
        ],
      },
    ],
  } as any,
  {
    type: "paragraph",
    children: [
      {
        text: "现代编辑器设计系统，如 ProScript Mono，更注重色调层次而非生硬的边框。通过微妙的背景色变化——从最底层的纯净画布到环境层的表面容器——视线被自然地引导穿过层级结构，而不会因技术网格产生视觉疲劳。",
      },
    ],
  },
  {
    type: "block-quote",
    children: [
      {
        text: "「最好的编辑器，是在你开始书写的那一刻便隐于无形的那一个。」",
      },
    ],
  },
];
