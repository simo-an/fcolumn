import { it, describe } from "vitest";
import { getGanZhiWuxing, getGanZhiYinYang, tiangan } from "../src/gan-zhi";

describe("天干地支 ", () => {
  it("数据校验", ({ expect }) => {
    const yangGan = ["甲", "丙", "戊", "庚", "壬"] as const;
    const yinGan = ["乙", "丁", "己", "辛", "癸"] as const;

    expect(yangGan).toMatchObject(tiangan.filter((_, index) => index % 2 === 0));
    expect(yinGan).toMatchObject(tiangan.filter((_, index) => index % 2 !== 0));
  });

  it("五行属性", ({ expect }) => {
    const ganZhiYinYang = [
      ["阳", ["甲", "丙", "戊", "庚", "壬"]],
      ["阴", ["乙", "丁", "己", "辛", "癸"]],
      ["阳", ["子", "寅", "辰", "午", "申", "戌"]],
      ["阴", ["丑", "卯", "巳", "未", "酉", "亥"]],
    ] as const;
    const ganZhiWuXing = [
      ["木", ["甲", "乙", "寅", "卯"]],
      ["火", ["丙", "丁", "巳", "午"]],
      ["土", ["戊", "己", "丑", "辰", "未", "戌"]],
      ["金", ["庚", "辛", "申", "酉"]],
      ["水", ["壬", "癸", "子", "亥"]],
    ] as const;

    ganZhiYinYang.forEach(([yinYang, ganList]) => {
      ganList.forEach((gan) => {
        expect(getGanZhiYinYang(gan)).toBe(yinYang);
      });
    });
    ganZhiWuXing.forEach(([wuXing, ganList]) => {
      ganList.forEach((gan) => {
        expect(gan + getGanZhiWuxing(gan)).toBe(gan + wuXing);
      });
    });
  });
  // describe.runIf(true)("test true", async () => {});
});
