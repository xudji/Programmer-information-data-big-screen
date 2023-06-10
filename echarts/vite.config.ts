import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// npm i @types/node -D
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        // 为每个scss文件自动添加 @import "@/styles/variables.scss";
        // 每个scss文件都可以使用变量
        additionalData: `@import "@/styles/variables.scss";`,
      },
    },
  },
  resolve: {
    alias: {
      // 配置路径别名
      "@": path.resolve(__dirname, "src"),
    },
  },
});
