const TABLE_BLOCKS = {
  td: "table-cell",
  th: "header-cell",
  tr: "table-row",
  table: "table",
  tbody: "table-body",
  thead: "table-header",
  tfoot: "table-footer",
  content: "paragraph",
} as const;

export const tableConfig = {
  blocks: TABLE_BLOCKS,
  withDelete: true,
  withFragments: true,
  withInsertText: true,
  withNormalization: true,
  withSelection: true,
  withSelectionAdjustment: true,
};
