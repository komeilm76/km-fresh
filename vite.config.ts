import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "./src/main.ts",
      name: "Fresh",
      fileName: "main",
      formats: ["cjs", "umd", "es"],
    },
    outDir: "./dist",
  },
});
