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
export const quote = (
  str: string,
  lquo = '"',
  rquo = lquo,
): string => `${lquo}${str}${rquo}`;

export default quote;
