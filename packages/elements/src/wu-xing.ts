type WuXing = "金" | "木" | "水" | "火" | "土";
// type FangWei = "东" | "南" | "西" | "北" | "中";
// type JiJie = "春" | "夏" | "秋" | "冬" | "末";
// const wuXingMap = new Map<WuXing, [FangWei, JiJie]>([
//   ["木", ["东", "春"]],
//   ["火", ["南", "夏"]],
//   ["土", ["中", "末"]],
//   ["金", ["西", "秋"]],
//   ["水", ["北", "冬"]],
// ]);

// 一定是 木 火 土 金 水
const wuXing = ["木", "火", "土", "金", "水"] as const;

// 我生
// ["木", "火"],
// ["火", "土"],
// ["土", "金"],
// ["金", "水"],
// ["水", "木"],
// 我克
// ["木", "土"],
// ["土", "水"],
// ["水", "火"],
// ["火", "金"],
// ["金", "木"],
function getShengWoZhe(element: WuXing) {
  return wuXing[(wuXing.indexOf(element) - 1 + 5) % 5];
}

function getWoShengZhe(element: WuXing) {
  return wuXing[(wuXing.indexOf(element) + 1) % 5];
}

function getKeWoZhe(element: WuXing) {
  return wuXing[(wuXing.indexOf(element) - 2 + 5) % 5];
}

function getWoKeZhe(element: WuXing) {
  return wuXing[(wuXing.indexOf(element) + 2) % 5];
}

export type { WuXing };
export { wuXing, getShengWoZhe, getWoShengZhe, getKeWoZhe, getWoKeZhe };
