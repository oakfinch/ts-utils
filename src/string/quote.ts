const DEFAULT_QUOTE = '"' as const;

/**
 * Wraps a string in quotes
 *
 * @param str the string to wrap
 * @param lquo left quote
 * @param rquo right quote
 * @returns the quoted string
 * @example
 * ```
 * quote('hello') // returns `"hello"`
 * quote('hello', '#') // returns `#hello#`
 * quote('hello', '<', '>') // returns `<hello>`
 * ```
 */
export function quote<T extends string>(str: T): `${typeof DEFAULT_QUOTE}${T}${typeof DEFAULT_QUOTE}`;
export function quote<T extends string, Q extends string>(str: T, quo: Q): `${Q}${T}${Q}`;
export function quote<T extends string, L extends string, R extends string>(str: T, lquo: L, rquo: R): `${L}${T}${R}`;
export function quote(
  str: string,
  lquo = DEFAULT_QUOTE,
  rquo = lquo,
): string {
  return `${lquo}${str}${rquo}`;
}

export default quote;
