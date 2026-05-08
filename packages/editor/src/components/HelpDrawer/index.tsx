import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@pkg/awsome";
import { HelpCircle } from "lucide-react";

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
];


export function HelpDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-lg hover:opacity-90 transition-opacity cursor-pointer"
      >
        <HelpCircle size={20} />
      </button>

      <Drawer open={open} onOpenChange={setOpen} direction="right">
        <DrawerContent className="h-full top-0 right-0 left-auto mt-0 w-[360px] rounded-none">
          <DrawerHeader>
            <DrawerTitle>帮助</DrawerTitle>
            <DrawerDescription />
          </DrawerHeader>
          <div className="flex flex-col gap-6 overflow-y-auto px-4 pb-4">
            <section>
              <h3 className="text-base font-bold mb-3">管理员演示账号</h3>
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex items-center justify-between p-2 bg-surface-container-low rounded">
                  <span className="font-medium">账号</span>
                  <span className="text-on-surface-variant">baize</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-surface-container-low rounded">
                  <span className="font-medium">密码</span>
                  <span className="text-on-surface-variant">baize123</span>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-base font-bold mb-3">切换房间</h3>
              <p className="text-sm text-on-surface-variant mb-2">
                通过 URL 参数{" "}
                <code className="text-xs bg-surface-container px-1 py-0.5 rounded font-mono">
                  ?roomid=1
                </code>{" "}
                切换房间，可用房间号 1 ~ 10。
              </p>
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 10 }, (_, i) => i + 1).map((id) => {
                  const current = new URLSearchParams(
                    window.location.search,
                  ).get("roomid");
                  const isActive = String(id) === current;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => (window.location.search = `?roomid=${id}`)}
                      className={`w-8 h-8 flex items-center justify-center rounded text-sm font-medium transition-colors cursor-pointer ${
                        isActive
                          ? "bg-primary text-white"
                          : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"
                      }`}
                    >
                      {id}
                    </button>
                  );
                })}
              </div>
            </section>

            <section>
              <h3 className="text-base font-bold mb-3">Markdown 快捷键</h3>
              <div className="flex flex-col gap-1.5">
                {shortcuts.map((s) => (
                  <div
                    key={s.keys}
                    className="flex items-center justify-between text-sm"
                  >
                    <code className="text-xs bg-surface-container px-1.5 py-0.5 rounded font-mono">
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
  );
}
