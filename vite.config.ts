import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src", // 將 @ 映射到 src
    },
  },
  build: {
    // 改變輸出資料的檔案
    outDir: "docs",
  },
});
