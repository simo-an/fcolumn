function isYES(txt: string) {
  return ["Y", "YES"].includes(txt.toUpperCase().trim());
}

function isNO(txt: string) {
  return ["N", "NO"].includes(txt.toUpperCase().trim());
}

function isDev(env: string) {
  return ["--dev", "-D", "--development"].includes(env.trim());
}

function isVersionLike(version: string) {
  const vs = version.split(".");
  return (
    vs.length >= 3 &&
    vs.length <= 4 &&
    vs.slice(0, 2).every((v) => !Number.isNaN(Number(v)) && Number(v) >= 0)
  );
}

function isStandardVersion(version: string) {
  return /^\d+\.\d+\.\d((-(rc|beta)\.\d+)|(\d+))?$/.test(version);
}

function toStandardVersion(version: string) {
  if (isStandardVersion(version)) {
    return version;
  }

  if (version.startsWith("v")) {
    return toStandardVersion(version.replace(/^v/, ""));
  }

  throw new Error("非法版本号");
}

export { isYES, isNO, isDev, isVersionLike, toStandardVersion };
