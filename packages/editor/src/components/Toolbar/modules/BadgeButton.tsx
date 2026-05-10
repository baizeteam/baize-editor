import { useSlate } from "slate-react"
import { Editor, Transforms, Element as SlateElement } from "slate"
import { Tag } from "lucide-react"
import { ToolbarButton } from "./ToolbarButton"

function isBadgeActive(editor: Editor): boolean {
  const [match] = Editor.nodes(editor, {
    match: (n) => SlateElement.isElement(n) && n.type === "badge",
  })
  return !!match
}

function toggleBadge(editor: Editor): void {
  const active = isBadgeActive(editor)
  if (active) {
    Transforms.unwrapNodes(editor, {
      match: (n) => SlateElement.isElement(n) && n.type === "badge",
    })
  } else {
    const { selection } = editor
    const text = selection ? Editor.string(editor, selection) : ""
    if (selection) Transforms.delete(editor)
    const badge: SlateElement = { type: "badge", children: [{ text }] }
    Transforms.insertNodes(editor, [{ text: " " }, badge, { text: " " }])
  }
}

export function BadgeButton() {
  const editor = useSlate()
  const active = isBadgeActive(editor)

  return (
    <ToolbarButton
      icon={<Tag size={16} />}
      title="标签"
      active={active}
      onMouseDown={() => toggleBadge(editor)}
    />
  )
}
