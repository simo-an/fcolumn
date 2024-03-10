import { it, describe } from "vitest";
import {
  WuXing,
  getKeWoZhe,
  getShengWoZhe,
  getWoKeZhe,
  getWoShengZhe,
  wuXing,
} from "../src/wu-xing";

describe("五行测试", () => {
  // beforeAll(async () => {});
  // afterAll(async () => {});

  const woShengList: WuXing[] = ["木", "火", "土", "金", "水"];
  const woKeList: WuXing[] = ["木", "土", "水", "火", "金"];

  const shengWoList: WuXing[] = ["木", "水", "金", "土", "火"];
  const keWoList: WuXing[] = ["木", "金", "火", "水", "土"];

  it("数据校验", ({ expect }) => {
    expect(wuXing).toMatchObject(woShengList);
  });

  it("相生相克", ({ expect }) => {
    woShengList.forEach((element, index) => {
      expect(getWoShengZhe(element)).toBe(woShengList[(index + 1) % 5]);
    });

    woKeList.forEach((element, index) => {
      expect(getWoKeZhe(element)).toBe(woKeList[(index + 1) % 5]);
    });

    shengWoList.forEach((element, index) => {
      expect(getShengWoZhe(element)).toBe(shengWoList[(index + 1) % 5]);
    });

    keWoList.forEach((element, index) => {
      expect(getKeWoZhe(element)).toBe(keWoList[(index + 1) % 5]);
    });
  });

  // describe.runIf(true)("test true", async () => {});
});
