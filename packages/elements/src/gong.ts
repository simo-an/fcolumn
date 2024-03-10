import { TenTiangan, TwelveDizhi, dizhi, getGanZhiYinYang, tiangan } from "./gan-zhi";
import { loopMoveLeftArray } from "./utils";
/**
 * 前置知识
 * 1. 阴阳二气不同，阳天干顺推，阴天干逆推
 * 2. 阳天干死则阴天干生，阴天干死则阳天干生
 * 3. 阳天干临官则阴天干帝旺，阴天干临官则阳天干帝旺
 * 4. 一切的开始为 亥水生甲木为长生
 */

/**
 * 天干寄宫计算方法
 */
const gong = [
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
] as const;

const startDiZhi = loopMoveLeftArray([...dizhi], -1);
// 阳天干死则阴天干生，阴天干死则阳天干生
// 阴阳二气不同，阳天干顺推，阴天干逆推
// 故左移八位，并逆转
const startYinDizhi = loopMoveLeftArray(startDiZhi, gong.indexOf("死") + 1).reverse();

type TwelveGong = (typeof gong)[number];

function getGongWei(gan: TenTiangan, dizhi: TwelveDizhi): TwelveGong {
  const dizhiList = getDizhiList(gan);
  const index = dizhiList.indexOf(dizhi);

  return gong[index];
}

function getDizhiList(gan: TenTiangan): TwelveDizhi[] {
  let index = tiangan.indexOf(gan);
  const isYang = index % 2 === 0;

  index = Math.floor(index / 2);

  if (index >= 2) {
    index -= 1;
  }

  return loopMoveLeftArray(isYang ? startDiZhi : startYinDizhi, index * (isYang ? 3 : -3));
}

export type { TwelveGong };
export { startDiZhi, startYinDizhi, gong, getDizhiList, getGongWei };
