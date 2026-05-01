import React from "react";
import { RenderElementProps, RenderLeafProps } from "slate-react";
import { CustomText } from "../../../types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface EditorPlugin {
  name: string;
  renderElement?: (props: RenderElementProps) => React.ReactElement | undefined;
  renderLeaf?: (props: RenderLeafProps) => React.ReactElement | undefined;
  onKeyDown?: (event: React.KeyboardEvent, editor: any) => void;
  withPlugin?: (editor: any) => any;
}

export const BasePlugin: EditorPlugin = {
  name: "base",
  renderElement: ({ attributes, children, element }) => {
    switch (element.type) {
      case "paragraph":
        return (
          <p {...attributes} className="mb-4 leading-relaxed text-lg">
            {children}
          </p>
        );
      case "heading-one":
        return (
          <h1
            {...attributes}
            className="text-5xl font-bold mb-8 mt-12 font-headline leading-tight"
          >
            {children}
          </h1>
        );
      case "heading-two":
        return (
          <h2
            {...attributes}
            className="text-3xl font-bold mb-6 mt-10 font-headline"
          >
            {children}
          </h2>
        );
      case "heading-three":
        return (
          <h3
            {...attributes}
            className="text-2xl font-bold mb-4 mt-8 font-headline"
          >
            {children}
          </h3>
        );
      case "heading-four":
        return (
          <h4
            {...attributes}
            className="text-xl font-bold mb-3 mt-6 font-headline"
          >
            {children}
          </h4>
        );
      case "heading-five":
        return (
          <h5
            {...attributes}
            className="text-lg font-bold mb-2 mt-4 font-headline"
          >
            {children}
          </h5>
        );
      case "heading-six":
        return (
          <h6
            {...attributes}
            className="text-base font-bold mb-2 mt-4 font-headline"
          >
            {children}
          </h6>
        );
      case "block-quote":
        return (
          <blockquote
            {...attributes}
            className="text-2xl font-headline font-semibold text-primary leading-snug pl-6 italic border-l-4 border-primary/20 my-8"
          >
            {children}
          </blockquote>
        );
      case "badge":
        return (
          <span
            {...attributes}
            className="inline-block bg-primary-container text-on-primary-container text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-widest"
          >
            {children}
          </span>
        );
      default:
        return undefined;
    }
  },
  renderLeaf: ({ attributes, children, leaf }) => {
    const textLeaf = leaf as CustomText;

    if (textLeaf.bold) {
      children = <strong>{children}</strong>;
    }
    if (textLeaf.italic) {
      children = <em>{children}</em>;
    }
    if (textLeaf.underline) {
      children = <u>{children}</u>;
    }
    if (textLeaf.strikethrough) {
      children = <span className="line-through">{children}</span>;
    }
    if (textLeaf.code) {
      children = (
        <code className="bg-surface-container px-1 rounded font-mono text-sm">
          {children}
        </code>
      );
    }

    const className = cn(
      (textLeaf as any).color === "secondary" &&
        "text-on-surface-variant text-xs",
    );

    const style: React.CSSProperties = {};
    if (textLeaf.color) {
      style.color = textLeaf.color;
    }
    if (textLeaf.backgroundColor) {
      style.backgroundColor = textLeaf.backgroundColor;
    }

    return (
      <span {...attributes} className={className} style={style}>
        {children}
      </span>
    );
  },
};
