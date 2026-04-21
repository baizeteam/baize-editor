import { BasePlugin } from "./modules/base";
import { TablePlugin } from "./modules/table";
import { ColorPlugin } from "./modules/color";
import { ImagePlugin } from "./modules/image";
import { ListPlugin } from "./modules/list";
import { MarkdownPlugin } from "./modules/markdown";

export const plugins = [
  BasePlugin,
  TablePlugin,
  ColorPlugin,
  ImagePlugin,
  ListPlugin,
  MarkdownPlugin,
];

export * from "./modules/base";
