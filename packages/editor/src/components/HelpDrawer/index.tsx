import { useState } from "react"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@pkg/awsome"
import { HelpCircle } from "lucide-react"

const shortcuts = [
  { keys: "# + 空格", desc: "标题 1" },
  { keys: "## + 空格", desc: "标题 2" },
  { keys: "### + 空格", desc: "标题 3" },
  { keys: "#### + 空格", desc: "标题 4" },
  { keys: "##### + 空格", desc: "标题 5" },
  { keys: "###### + 空格", desc: "标题 6" },
  { keys: "> + 空格", desc: "引用" },
  { keys: "- + 空格", desc: "无序列表" },
  { keys: "1. + 空格", desc: "有序列表" },
  { keys: "`文字` + 空格", desc: "标签" },
]

export function HelpDrawer() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed right-6 bottom-6 z-50 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white text-black shadow-lg transition-opacity hover:opacity-90"
      >
        <HelpCircle size={20} />
      </button>

      <Drawer open={open} onOpenChange={setOpen} direction="right">
        <DrawerContent className="top-0 right-0 left-auto mt-0 h-full w-[360px] rounded-none">
          <DrawerHeader>
            <DrawerTitle>帮助</DrawerTitle>
            <DrawerDescription />
          </DrawerHeader>
          <div className="flex flex-col gap-6 overflow-y-auto px-4 pb-4">
            <section>
              <h3 className="mb-3 text-base font-bold">管理员演示账号</h3>
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex items-center justify-between rounded bg-surface-container-low p-2">
                  <span className="font-medium">账号</span>
                  <span className="text-on-surface-variant">baize</span>
                </div>
                <div className="flex items-center justify-between rounded bg-surface-container-low p-2">
                  <span className="font-medium">密码</span>
                  <span className="text-on-surface-variant">baize123</span>
                </div>
              </div>
            </section>

            <section>
              <h3 className="mb-3 text-base font-bold">切换房间</h3>
              <p className="mb-2 text-sm text-on-surface-variant">
                通过 URL 参数{" "}
                <code className="bg-surface-container rounded px-1 py-0.5 font-mono text-xs">
                  ?roomid=1
                </code>{" "}
                切换房间，可用房间号 1 ~ 10。
              </p>
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 10 }, (_, i) => i + 1).map((id) => {
                  const current = new URLSearchParams(
                    window.location.search
                  ).get("roomid")
                  const isActive = String(id) === current
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => (window.location.search = `?roomid=${id}`)}
                      className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-primary text-white"
                          : "hover:bg-surface-container bg-surface-container-low text-on-surface-variant"
                      }`}
                    >
                      {id}
                    </button>
                  )
                })}
              </div>
            </section>

            <section>
              <h3 className="mb-3 text-base font-bold">Markdown 快捷键</h3>
              <div className="flex flex-col gap-1.5">
                {shortcuts.map((s) => (
                  <div
                    key={s.keys}
                    className="flex items-center justify-between text-sm"
                  >
                    <code className="bg-surface-container rounded px-1.5 py-0.5 font-mono text-xs">
                      {s.keys}
                    </code>
                    <span className="text-on-surface-variant">{s.desc}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  )
}
