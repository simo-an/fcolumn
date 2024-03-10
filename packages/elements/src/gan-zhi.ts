import { WuXing, wuXing } from "./wu-xing";
import { YinYang, yinYang } from "./yin-yang";

// 干支阴阳表
// ["阳干", ["甲", "丙", "戊", "庚", "壬"]]
// ["阴干", ["乙", "丁", "己", "辛", "癸"]]
// ["阳支", ["子", "寅", "辰", "午", "申", "戌"]]
// ["阴支", ["丑", "卯", "巳", "未", "酉", "亥"]]

// 干支五行表
// ["木", ["甲", "乙", "寅", "卯"]]
// ["火", ["丙", "丁", "巳", "午"]]
// ["土", ["戊", "己", "丑", "辰", "未", "戌"]]
// ["金", ["庚", "辛", "申", "酉"]]
// ["水", ["壬", "癸", "子", "亥"]]

const tiangan = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"] as const;
const dizhi = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"] as const;

type TenTiangan = (typeof tiangan)[number];
type TwelveDizhi = (typeof dizhi)[number];

function isTiangan(gan: string): gan is TenTiangan {
  return tiangan.includes(gan as TenTiangan);
}

function isDizhi(zhi: string): zhi is TwelveDizhi {
  return dizhi.includes(zhi as TwelveDizhi);
}

function getTianganWuxing(gan: TenTiangan): WuXing {
  const index = tiangan.indexOf(gan);
  if (index === -1) {
    throw new Error(`未知天干: ${gan}`);
  }

  return wuXing[Math.floor(index / 2)];
}

function getDizhiWuxing(zhi: TwelveDizhi): WuXing {
  let index = dizhi.indexOf(zhi);
  if (index === -1) {
    throw new Error(`未知地支: ${zhi}`);
  }
  // 左移两位，将 "寅" "卯" 移到开始
  index = (index - 2 + 12) % 12;

  let wuXingIndex = Math.floor(index / 3);

  // 辰 戌 丑 未 为土
  if (index % 3 === 2) {
    return wuXing[2];
  }

  if (wuXingIndex >= 2) {
    wuXingIndex += 1; // 去掉 土
  }

  return wuXing[wuXingIndex];
}

function getGanZhiYinYang(ganZhi: TenTiangan | TwelveDizhi): YinYang {
  if (isTiangan(ganZhi)) {
    return yinYang[tiangan.indexOf(ganZhi) % 2];
  }

  if (isDizhi(ganZhi)) {
    return yinYang[dizhi.indexOf(ganZhi) % 2];
  }

  throw new Error(`未知干支: ${ganZhi}`);
}

function getGanZhiWuxing(ganZhi: TenTiangan | TwelveDizhi): WuXing {
  if (isTiangan(ganZhi)) {
    return getTianganWuxing(ganZhi);
  }

  if (isDizhi(ganZhi)) {
    return getDizhiWuxing(ganZhi);
  }

  throw new Error(`未知干支: ${ganZhi}`);
}

// 天干
//   ["甲", ["阳", "木"]],
//   ["乙", ["阴", "木"]],
//   ["丙", ["阳", "火"]],
//   ["丁", ["阴", "火"]],
//   ["戊", ["阳", "土"]],
//   ["己", ["阴", "土"]],
//   ["庚", ["阳", "金"]],
//   ["辛", ["阴", "金"]],
//   ["壬", ["阳", "水"]],
//   ["癸", ["阴", "水"]],
// 地支
//   ["子", ["阳", "水"]],
//   ["丑", ["阴", "土"]],
//   ["寅", ["阳", "木"]],
//   ["卯", ["阴", "木"]],
//   ["辰", ["阳", "土"]],
//   ["巳", ["阴", "火"]],
//   ["午", ["阳", "火"]],
//   ["未", ["阴", "土"]],
//   ["申", ["阳", "金"]],
//   ["酉", ["阴", "金"]],
//   ["戌", ["阳", "土"]],
//   ["亥", ["阴", "水"]],
function getGanZhiShuXing(ganZhi: TenTiangan | TwelveDizhi): [YinYang, WuXing] {
  return [getGanZhiYinYang(ganZhi), getGanZhiWuxing(ganZhi)];
}

export type { TenTiangan, TwelveDizhi };
export { tiangan, dizhi, getGanZhiShuXing, getGanZhiWuxing, getGanZhiYinYang };
