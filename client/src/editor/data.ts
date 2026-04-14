import {
  createEditor,
  Descendant,
  Editor,
  Element as SlateElement,
  Path,
} from "slate";
export const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [
      {
        type: "badge",
        children: [{ text: "Essay" }],
      } as any,
      { text: " Modified 4 hours ago", color: "secondary" } as any,
    ],
  },
  {
    type: "heading-one",
    children: [{ text: "The Architecture of Minimalist Interfaces" }],
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
              { type: "table-cell", children: [{ text: "Component" }] as any },
              { type: "table-cell", children: [{ text: "Role" }] as any },
            ],
          },
          {
            type: "table-row",
            children: [
              { type: "table-cell", children: [{ text: "Typography" }] as any },
              { type: "table-cell", children: [{ text: "Structure" }] as any },
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
        text: "Modern editorial design systems, like ProScript Mono, prioritize tonal layering over harsh borders. By using subtle background shifts—moving from the pure canvas of surface-container-lowest to the environmental surface-container-low—the eye is guided through hierarchy without the fatigue of technical grids.",
      },
    ],
  },
  {
    type: "block-quote",
    children: [
      {
        text: '"The best editor is the one that disappears at the moment you begin to speak."',
      },
    ],
  },
];
