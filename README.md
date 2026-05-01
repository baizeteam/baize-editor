# 白泽编辑器

基于 [Slate](https://docs.slatejs.org/) + [Yjs](https://yjs.dev/) 的实时协同富文本编辑器。

## 特性

- 实时多人协同编辑（Yjs CRDT 自动合并冲突）
- 插件化架构，每个功能独立为一个 `EditorPlugin`
- Markdown 快捷键：标题、引用、列表、标签
- 表格支持：合并单元格、右键菜单
- 图片插入与拖拽调整宽度
- 访客权限控制：管理员可切换只读/可编辑
- 多房间支持（URL 参数 `?roomid=1~10`）

## 技术栈

| 层级     | 技术                                |
| -------- | ----------------------------------- |
| 编辑器   | Slate + slate-react + slate-history |
| 协同引擎 | Yjs + y-websocket + @slate-yjs/core |
| 前端框架 | React 19 + TypeScript               |
| 样式     | Tailwind CSS 4                      |
| UI 组件  | Ant Design 6                        |
| 构建工具 | Vite 8                              |
| 后端     | Express + ws（WebSocket）           |
| 部署     | Docker Compose                      |

## 项目结构

```
baize-editor/
├── client/                     # 前端
│   └── src/
│       ├── components/
│       │   ├── editor/         # 编辑器核心（Editor、CollaborativeEditor、data）
│       │   ├── Toolbar/        # 工具栏（按钮、样式）
│       │   ├── HelpDrawer/     # 帮助抽屉
│       │   ├── Cursors/        # 协同光标
│       │   └── TableMenu/      # 表格右键菜单
│       └── core/
│           ├── plugins/        # 插件系统
│           │   └── modules/
│           │       ├── base/       # 段落、标题、引用、行内样式
│           │       ├── badge/      # 标签行内元素
│           │       ├── color/      # 文字/背景颜色
│           │       ├── image/      # 图片
│           │       ├── list/       # 有序/无序列表
│           │       ├── markdown/   # Markdown 快捷键
│           │       └── table/      # 表格
│           └── types.ts        # Slate 类型定义
├── server/                     # 后端（Yjs WebSocket 服务）
│   └── main.js
├── docker-compose.yaml
└── package.json
```

## 快速开始

### 本地开发

```bash
# 安装依赖
pnpm install

# 启动前端（默认 http://localhost:3000）
pnpm run client

# 启动后端（默认 ws://localhost:6652）
pnpm run server
```

### Docker 部署

```bash
docker-compose up -d
```

- 前端：`http://localhost:3000`
- 后端：`ws://localhost:6652`

## 插件一览

| 插件           | 职责                                     | 快捷方式                         |
| -------------- | ---------------------------------------- | -------------------------------- |
| BasePlugin     | 段落、标题 H1-H6、引用、行内样式         | —                                |
| BadgePlugin    | 标签行内元素，支持插入、删除、工具栏切换 | `` `文字` `` + 空格              |
| ColorPlugin    | 文字颜色与背景颜色                       | —                                |
| ImagePlugin    | 图片插入与拖拽调整宽度                   | —                                |
| ListPlugin     | 有序列表、无序列表、回车自动续行         | `-` 或 `1.` + 空格               |
| MarkdownPlugin | 标题、引用、列表、标签的键盘快捷转换     | `#` / `>` / `-` / `` ` `` + 空格 |
| TablePlugin    | 表格插入、合并单元格、右键菜单           | —                                |

## 演示账号

| 角色   | 账号     | 密码     |
| ------ | -------- | -------- |
| 管理员 | baize    | baize123 |
| 访客   | 无需登录 | —        |

## License

[MIT](LICENSE)
