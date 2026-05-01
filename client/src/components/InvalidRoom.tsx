export default function InvalidRoom() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-300">404</h1>
        <p className="mt-4 text-lg text-gray-500">
          请在 URL 中指定有效的房间号
        </p>
        <p className="mt-2 text-sm text-gray-400">
          例如：<code className="rounded bg-gray-100 px-2 py-1">?roomid=1</code>
        </p>
        <p className="mt-1 text-sm text-gray-400">可用房间号：1 ~ 10</p>
      </div>
    </div>
  );
}
