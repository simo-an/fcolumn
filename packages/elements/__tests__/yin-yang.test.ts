import { it, describe } from "vitest";
import { yinYang } from "../src/yin-yang";

describe("阴阳", () => {
  it("基础测试", ({ expect }) => {
    expect(yinYang).toMatchObject(["阳", "阴"]);
  });

  // describe.runIf(true)("test true", async () => {});
});
