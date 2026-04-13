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
    type: "paragraph",
    children: [
      {
        text: "In the digital atelier, the interface is not merely a toolset; it is the environment in which thought transforms into structure. When we strip away the noise of traditional software, we create space for intentionality.",
      },
    ],
  },
  {
    type: "table",
    children: [
      {
        type: "table-row",
        children: [
          { type: "table-cell", children: [{ text: "Component", bold: true }] },
          { type: "table-cell", children: [{ text: "Role", bold: true }] },
        ],
      },
      {
        type: "table-row",
        children: [
          { type: "table-cell", children: [{ text: "Typography" }] },
          { type: "table-cell", children: [{ text: "Structure" }] },
        ],
      },
    ],
  },
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
