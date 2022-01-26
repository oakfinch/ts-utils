/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Alias of String.replace
 */
export function replace(
  source: string,
  searchValue: string | RegExp,
  replacer: (substring: string, ...args: any[]) => string
): string

/**
 * Alias of String.replace
 */
export function replace(source: string, searchValue: string | RegExp, replaceValue: string): string

/**
 * Iterates over `searchReplaceMap`, calling source.replace(key, value) for each entry
 * in the object
 */
export function replace(
  source: string,
  searchReplaceMap: { [index: string]: string | ((substring: string, ...args: any[]) => string) }
): string

export function replace(
  source: string,
  ...rest:
    | [string | RegExp, string | ((substring: string, ...args: any[]) => string)]
    | [{ [index: string]: string | ((substring: string, ...args: any[]) => string) }]
): string {
  return rest.length === 2
    ? source.replace(...(rest as Parameters<string['replace']>))
    : Object.entries(rest[0]).reduce(
        (acc, args) => acc.replace(...(args as [string, string])),
        source
      )
}

export default replace
