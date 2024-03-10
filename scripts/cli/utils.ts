function cacheStringFunction<T extends (str: string) => string>(fn: T): T {
  const cache: Record<string, string> = Object.create(null);
  return ((str: string) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  }) as T;
}

const camelizeRE = /-(\w)/g;
const hyphenateRE = /\B([A-Z])/g;

// from hello-world => helloWorld
const camelize = cacheStringFunction((str: string): string => {
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ""));
});

// from helloWorld => hello-world
const hyphenate = cacheStringFunction((str: string) =>
  str.replace(hyphenateRE, "-$1").toLowerCase()
);
// from hello => Hello
const capitalize = cacheStringFunction(<T extends string>(str: T) => {
  return (str.charAt(0).toUpperCase() + str.slice(1)) as Capitalize<T>;
});

export { camelize, hyphenate, capitalize };
