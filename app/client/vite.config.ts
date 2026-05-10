import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import path from "path"
import { defineConfig } from "vite"
import { codeInspectorPlugin } from "code-inspector-plugin"

export default defineConfig(({ mode }) => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      codeInspectorPlugin({
        bundler: "vite",
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@pkg/awsome": path.resolve(__dirname, "../../packages/awsome/src"),
        "@pkg/editor": path.resolve(__dirname, "../../packages/editor/src"),
      },
    },
    server: {
      port: 3000,
      host: "0.0.0.0",
      hmr: process.env.DISABLE_HMR !== "true",
    },
  }
})
