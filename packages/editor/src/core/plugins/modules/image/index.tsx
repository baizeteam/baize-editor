import React, { useState, useCallback, useEffect } from "react"
import { Transforms, Editor, Element as SlateElement } from "slate"
import {
  ReactEditor,
  useSlateStatic,
  useSelected,
  useFocused,
  RenderElementProps,
} from "slate-react"
import { EditorPlugin } from "../base"
import { ImageElement } from "../../../types"

const ResizableImage = ({
  attributes,
  children,
  element,
}: RenderElementProps) => {
  const editor = useSlateStatic()
  const selected = useSelected()
  const focused = useFocused()
  const imageElement = element as ImageElement

  const [width, setWidth] = useState(imageElement.width || 400)
  const [isResizing, setIsResizing] = useState(false)

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      setIsResizing(true)

      const startX = e.clientX
      const startWidth = width
      let currentWidth = startWidth

      const onMouseMove = (e: MouseEvent) => {
        currentWidth = Math.max(100, startWidth + (e.clientX - startX))
        setWidth(currentWidth)
      }

      const onMouseUp = () => {
        setIsResizing(false)
        document.removeEventListener("mousemove", onMouseMove)
        document.removeEventListener("mouseup", onMouseUp)

        Transforms.setNodes(
          editor,
          { width: currentWidth } as Partial<SlateElement>,
          { at: ReactEditor.findPath(editor, element) }
        )
      }

      document.addEventListener("mousemove", onMouseMove)
      document.addEventListener("mouseup", onMouseUp)
    },
    [editor, element, width]
  )

  useEffect(() => {
    if (imageElement.width) {
      setWidth(imageElement.width)
    }
  }, [imageElement.width])

  return (
    <div {...attributes}>
      <div contentEditable={false} className="group relative inline-block">
        <img
          src={imageElement.url}
          alt=""
          style={{ width: `${width}px` }}
          className={`block max-w-full rounded-xl shadow-lg transition-shadow ${
            selected && focused ? "shadow-2xl ring-2 ring-primary" : ""
          }`}
          referrerPolicy="no-referrer"
        />

        {/* Resize Handle */}
        <div
          onMouseDown={onMouseDown}
          className={`absolute right-2 bottom-2 h-4 w-4 cursor-se-resize rounded-full border-2 border-white bg-primary shadow-md transition-opacity ${
            selected && focused
              ? "opacity-100"
              : "opacity-0 group-hover:opacity-50"
          }`}
        />

        {isResizing && (
          <div className="absolute top-2 right-2 rounded-full bg-black/60 px-2 py-0.5 font-mono text-[10px] text-white">
            {Math.round(width)}px
          </div>
        )}
      </div>
      {children}
    </div>
  )
}

export const ImagePlugin: EditorPlugin = {
  name: "image",
  renderElement: (props) => {
    if (props.element.type === "image") {
      return <ResizableImage {...props} />
    }
    return undefined
  },
  withPlugin: (editor) => {
    const { isVoid } = editor
    editor.isVoid = (element) => {
      return element.type === "image" ? true : isVoid(element)
    }
    return editor
  },
}

export const insertImage = (editor: Editor, url: string) => {
  const text: any = { text: "" }
  const image: ImageElement = { type: "image", url, children: [text] }

  // Insert the image
  Transforms.insertNodes(editor, image)

  // Insert an empty paragraph after the image to ensure the editor remains usable
  Transforms.insertNodes(editor, {
    type: "paragraph",
    children: [{ text: "" }],
  } as any)
}
