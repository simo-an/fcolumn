import { it, describe } from "vitest";
import { getDizhiList, getGongWei, gong, startDiZhi, startYinDizhi } from "../src/gong";

describe("十天干寄十二宫", () => {
  const yangGan = ["甲", "丙", "戊", "庚", "壬"] as const;
  const yinGan = ["乙", "丁", "己", "辛", "癸"] as const;
  const constGong = [
    "长生",
    "沐浴",
    "冠带",
    "临官",
    "帝旺",
    "衰",
    "病",
    "死",
    "墓",
    "绝",
    "胎",
    "养",
  ];

  const yangGanZhiGong = {
    甲: ["亥", "子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌"],
    丙: ["寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥", "子", "丑"],
    戊: ["寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥", "子", "丑"],
    庚: ["巳", "午", "未", "申", "酉", "戌", "亥", "子", "丑", "寅", "卯", "辰"],
    壬: ["申", "酉", "戌", "亥", "子", "丑", "寅", "卯", "辰", "巳", "午", "未"],
  } as const;
  const yinGanZhiGong = {
    乙: ["午", "巳", "辰", "卯", "寅", "丑", "子", "亥", "戌", "酉", "申", "未"],
    丁: ["酉", "申", "未", "午", "巳", "辰", "卯", "寅", "丑", "子", "亥", "戌"],
    己: ["酉", "申", "未", "午", "巳", "辰", "卯", "寅", "丑", "子", "亥", "戌"],
    辛: ["子", "亥", "戌", "酉", "申", "未", "午", "巳", "辰", "卯", "寅", "丑"],
    癸: ["卯", "寅", "丑", "子", "亥", "戌", "酉", "申", "未", "午", "巳", "辰"],
  } as const;

  it("数据校验", ({ expect }) => {
    expect(gong).toMatchObject(constGong);

    expect(startDiZhi).toMatchObject(yangGanZhiGong["甲"]);
    expect(startYinDizhi).toMatchObject(yinGanZhiGong["乙"]);
  });

  it("自坐", ({ expect }) => {
    yangGan.forEach((gan) => {
      const dizhiList = yangGanZhiGong[gan];
      expect(getDizhiList(gan)).toMatchObject(dizhiList);

      dizhiList.forEach((dizhi, index) => {
        expect(getGongWei(gan, dizhi)).toBe(constGong[index]);
      });
    });

    yinGan.forEach((gan) => {
      const dizhiList = yinGanZhiGong[gan];

      expect(getDizhiList(gan)).toMatchObject(dizhiList);

      dizhiList.forEach((dizhi, index) => {
        expect(getGongWei(gan, dizhi)).toBe(constGong[index]);
      });
    });
  });
  // describe.runIf(true)("test true", async () => {});
});
