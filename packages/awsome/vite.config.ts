import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig(({ mode }) => {
  const isLib = mode === "library"

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    ...(isLib
      ? {
          build: {
            lib: {
              entry: path.resolve(__dirname, "src/index.ts"),
              formats: ["es"],
              fileName: "index",
            },
            rollupOptions: {
              external: ["react", "react-dom", "react/jsx-runtime"],
              output: {
                globals: {
                  react: "React",
                  "react-dom": "ReactDOM",
                },
                assetFileNames: (assetInfo) => {
                  if (assetInfo.name?.endsWith(".css")) return "style.css"
                  return assetInfo.name || "assets/[name]-[hash][extname]"
                },
              },
            },
            cssCodeSplit: false,
            outDir: "dist",
          },
        }
      : {}),
  }
})
