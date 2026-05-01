import React, { useState } from "react";
import { Drawer, Button } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

const shortcuts = [
  { keys: "# + 空格", desc: "标题 1" },
  { keys: "## + 空格", desc: "标题 2" },
  { keys: "### + 空格", desc: "标题 3" },
  { keys: "> + 空格", desc: "引用" },
  { keys: "- + 空格", desc: "无序列表" },
  { keys: "1. + 空格", desc: "有序列表" },
  { keys: "`文字` + 空格", desc: "徽章" },
];

const inlineShortcuts = [
  { keys: "Ctrl/⌘ + B", desc: "粗体" },
  { keys: "Ctrl/⌘ + I", desc: "斜体" },
  { keys: "Ctrl/⌘ + U", desc: "下划线" },
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
        <QuestionCircleOutlined style={{ fontSize: 20 }} />
      </button>

      <Drawer
        title="帮助"
        placement="right"
        width={360}
        open={open}
        onClose={() => setOpen(false)}
      >
        <div className="flex flex-col gap-6">
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

          <section>
            <h3 className="text-base font-bold mb-3">行内快捷键</h3>
            <div className="flex flex-col gap-1.5">
              {inlineShortcuts.map((s) => (
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
      </Drawer>
    </>
  );
}
