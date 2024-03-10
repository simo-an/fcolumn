import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    testTimeout: 600000,
    include: ["packages/elements/__tests__/*.test.ts"],
    reporters: ["verbose"],
  },
});
