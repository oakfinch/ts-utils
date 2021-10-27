/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Similar to Array.push, but returns a new array instead of modifying the
 * original array.
 *
 * @example
 * ```
 * const a = [1, 2, 3, 4];
 * const b = push(a, 5);
 * // a is [1, 2, 3, 4]
 * // b is [1, 2, 3, 4, 5]
 *
 * // as opposed to:
 * const a = [1, 2, 3, 4]
 * a.push(5)
 * // a is [1, 2, 3, 4, 5]
 * ```
 */
export const push = <T extends readonly any[], U>(arr: T, item: U): [...T, U] => [...arr, item];
export default push;
