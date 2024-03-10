const yinYang = ["阳", "阴"] as const;

type YinYang = (typeof yinYang)[number];

export type { YinYang };
export { yinYang };
