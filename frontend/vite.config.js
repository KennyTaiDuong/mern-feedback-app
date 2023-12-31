import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/vitest-setup.js",
    css: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
    },
  },
  transform: {
    "\\.(js|jsx)$": "babel-jest",
    "^.+\\.css$": "jest-transform-css",
    "^.+\\.scss$": "jest-transform-css",
    "^.+\\.styled.js$": "jest-styled-components",
  },
});
