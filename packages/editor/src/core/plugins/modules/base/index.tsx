import React from "react"
import { RenderElementProps, RenderLeafProps } from "slate-react"
import { CustomText } from "../../../types"
import { cn } from "@pkg/awsome"

export interface EditorPlugin {
  name: string
  renderElement?: (props: RenderElementProps) => React.ReactElement | undefined
  renderLeaf?: (props: RenderLeafProps) => React.ReactElement | undefined
  onKeyDown?: (event: React.KeyboardEvent, editor: any) => void
  withPlugin?: (editor: any) => any
}

export const BasePlugin: EditorPlugin = {
  name: "base",
  renderElement: ({ attributes, children, element }) => {
    switch (element.type) {
      case "paragraph":
        return (
          <p {...attributes} className="mb-4 text-lg leading-relaxed">
            {children}
          </p>
        )
      case "heading-one":
        return (
          <h1
            {...attributes}
            className="mt-8 mb-8 font-headline text-5xl leading-tight font-bold"
          >
            {children}
          </h1>
        )
      case "heading-two":
        return (
          <h2
            {...attributes}
            className="mt-10 mb-6 font-headline text-3xl font-bold"
          >
            {children}
          </h2>
        )
      case "heading-three":
        return (
          <h3
            {...attributes}
            className="mt-8 mb-4 font-headline text-2xl font-bold"
          >
            {children}
          </h3>
        )
      case "heading-four":
        return (
          <h4
            {...attributes}
            className="mt-6 mb-3 font-headline text-xl font-bold"
          >
            {children}
          </h4>
        )
      case "heading-five":
        return (
          <h5
            {...attributes}
            className="mt-4 mb-2 font-headline text-lg font-bold"
          >
            {children}
          </h5>
        )
      case "heading-six":
        return (
          <h6
            {...attributes}
            className="mt-4 mb-2 font-headline text-base font-bold"
          >
            {children}
          </h6>
        )
      case "block-quote":
        return (
          <blockquote
            {...attributes}
            className="my-8 border-l-4 border-primary/20 pl-6 font-headline text-2xl leading-snug font-semibold text-primary italic"
          >
            {children}
          </blockquote>
        )
      default:
        return undefined
    }
  },
  renderLeaf: ({ attributes, children, leaf }) => {
    const textLeaf = leaf as CustomText

    if (textLeaf.bold) {
      children = <strong>{children}</strong>
    }
    if (textLeaf.italic) {
      children = <em>{children}</em>
    }
    if (textLeaf.underline) {
      children = <u>{children}</u>
    }
    if (textLeaf.strikethrough) {
      children = <span className="line-through">{children}</span>
    }
    if (textLeaf.code) {
      children = (
        <code className="bg-surface-container rounded px-1 font-mono text-sm">
          {children}
        </code>
      )
    }

    const className = cn(
      (textLeaf as any).color === "secondary" &&
        "text-xs text-on-surface-variant"
    )

    const style: React.CSSProperties = {}
    if (textLeaf.color) {
      style.color = textLeaf.color
    }
    if (textLeaf.backgroundColor) {
      style.backgroundColor = textLeaf.backgroundColor
    }

    return (
      <span {...attributes} className={className} style={style}>
        {children}
      </span>
    )
  },
}
