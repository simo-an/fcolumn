import { TenTiangan, TwelveDizhi } from "../gan-zhi";
import { TwelveGong } from "../gong";
import { WuXing } from "../wu-xing";

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
    星运: gong,
  };

  console.table(info);
}

export { drawFourColumnGraph };
