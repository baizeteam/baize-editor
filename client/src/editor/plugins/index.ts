import { BasePlugin } from "./base";
import { TablePlugin } from "./table";
import { ColorPlugin } from "./color";
import { ImagePlugin } from "./image";
import { ListPlugin } from "./list";
import { MarkdownPlugin } from "./markdown";

export const plugins = [
  BasePlugin,
  TablePlugin,
  ColorPlugin,
  ImagePlugin,
  ListPlugin,
  MarkdownPlugin,
];

export * from "./base";
