import { useSlate } from "slate-react"
import { Transforms } from "slate"
import { Button, Tooltip, TooltipContent, TooltipTrigger } from "@pkg/awsome"
import { Table2 } from "lucide-react"
import { defaultTable } from "../helper"

export function InsertTableButton() {
  const editor = useSlate()

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="flex-shrink-0"
          onMouseDown={(e) => {
            e.preventDefault()
            Transforms.insertNodes(editor, defaultTable)
          }}
        >
          <Table2 size={16} />
        </Button>
      </TooltipTrigger>
      <TooltipContent>插入表格</TooltipContent>
    </Tooltip>
  )
}
