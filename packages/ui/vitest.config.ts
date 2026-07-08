import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
    coverage: {
      provider: "istanbul",
      reporter: ["text", "json", "html"],
      include: ["src/components/**/*.tsx", "src/features/**/*.tsx"],
      exclude: ["src/components/icons/**"],
    },
  },
  resolve: {
    alias: {
      "@repo/ui": resolve(__dirname, "./src"),
    },
  },
});
