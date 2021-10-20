// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Replacer = (substring: string, ...args: any[]) => string;
type SearchValue = string | RegExp;
type SearchReplaceMap = { [index: string]: string | Replacer };

/**
 * Alias of String.replace
 */
export function replace(source: string, searchValue: SearchValue, replacer: Replacer): string;
/**
 * Alias of String.replace
 */
export function replace(source: string, searchValue: SearchValue, replaceValue: string): string;
/**
 * Iterates over `searchReplaceMap`, calling source.replace(key, value) for each entry
 * in the object
 */
export function replace(source: string, searchReplaceMap: SearchReplaceMap): string;
export function replace(
  source: string,
  ...rest: [SearchValue, string | Replacer] | [SearchReplaceMap]
): string {
  return (rest.length === 2)
    ? source.replace(...rest as Parameters<string['replace']>)
    : Object.entries(rest[0]).reduce(
      (acc, args) => acc.replace(...args as [string, string]),
      source,
    );
}

export default replace;
