import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
  {
    // add "extends" to merge two configs together
    extends: "vitest.config.ts",
    define: {},
  },
]);
