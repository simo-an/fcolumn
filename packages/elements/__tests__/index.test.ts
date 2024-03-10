import { it, describe } from "vitest";
import { TenTiangan, TwelveDizhi, getGanZhiWuxing } from "../src/gan-zhi";
import { TwelveGong, getGongWei } from "../src/gong";
import { WuXing } from "../src/wu-xing";

function drawFourColumnGraph(
  tiangan: TenTiangan[],
  dizhi: TwelveDizhi[],
  tianganWuXing: WuXing[],
  dizhiWuXing: WuXing[],
  gong: TwelveGong[]
) {
  const info = {
    日期: ["年柱", "月柱", "日柱", "时柱"],
    天干: tiangan,
    天干五行: tianganWuXing,
    地支: dizhi,
    地支五行: dizhiWuXing,
    宫位: gong,
  };

  console.table(info);
}

describe("案例测试 ", () => {
  it("四柱案例一", ({ expect }) => {
    const tiangan = ["甲", "丁", "癸", "己"] as const;
    const dizhi = ["辰", "卯", "酉", "未"] as const;

    const tianganWuXing = ["木", "火", "水", "土"] as const;
    const dizhiWuXing = ["土", "木", "金", "土"] as const;
    const gong = ["养", "长生", "病", "墓"] as const;
    // const zizuo = ["衰", "衰", "病", "冠带"] as const;

    tiangan.forEach((gan, index) => {
      expect(getGanZhiWuxing(gan)).toBe(tianganWuXing[index]);
    });

    dizhi.forEach((zhi, index) => {
      // 阴阳
      expect(getGanZhiWuxing(zhi)).toBe(dizhiWuXing[index]);
      // 宫位
      expect(getGongWei(tiangan[2], zhi)).toBe(gong[index]);
    });

    drawFourColumnGraph([...tiangan], [...dizhi], [...tianganWuXing], [...dizhiWuXing], [...gong]);
  });
});
