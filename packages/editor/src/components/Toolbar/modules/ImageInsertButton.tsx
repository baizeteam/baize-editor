import { useState } from "react"
import { useSlate } from "slate-react"
import {
  Button,
  Input,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@pkg/awsome"
import { Image } from "lucide-react"
import { insertImage } from "../../../core/plugins/modules/image"
import { styles } from "../styles"

export function ImageInsertButton() {
  const editor = useSlate()
  const [imageUrl, setImageUrl] = useState("")
  const [open, setOpen] = useState(false)

  const commit = () => {
    if (!imageUrl) return
    insertImage(editor, imageUrl)
    setImageUrl("")
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="flex-shrink-0">
              <Image size={16} />
            </Button>
          </PopoverTrigger>
        </TooltipTrigger>
        <TooltipContent>插入图片</TooltipContent>
      </Tooltip>
      <PopoverContent className={styles.popoverContent.imageInputWidth}>
        <div className={styles.popoverContent.imageInput}>
          <Input
            placeholder="输入图片地址..."
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && commit()}
            autoFocus
          />
          <div className={styles.popoverContent.imageActions}>
            <Button size="sm" variant="outline" onClick={() => setOpen(false)}>
              取消
            </Button>
            <Button size="sm" disabled={!imageUrl} onClick={commit}>
              插入
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
