/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Value } from '@oakfinch/ts-extra'
import { last } from './last'

/**
 * Similar to Array.pop, but returns an array along with the "popped" item
 * instead of modifying the original array.
 *
 * @example
 * ```
 * const original = [1, 2, 3, 4, 5];
 * const [last, modified] = pop(original);
 * // original is [1, 2, 3, 4, 5]
 * // modified is [1, 2, 3, 4]
 * // last == 5
 *
 * // as opposed to:
 * const original = [1, 2, 3, 4, 5]
 * const last = original.pop();
 * // original == [1, 2, 3, 4]
 * // last == 5
 * ```
 */
export const pop = <T extends readonly any[]>(
  arr: T
): T extends readonly [...infer T0, infer T1] ? [T1, T0] : [Value<T>, Value<T>[]] =>
  [last(arr), arr.slice(0, arr.length - 1)] as T extends readonly [...infer T0, infer T1]
    ? [T1, T0]
    : [Value<T>, Value<T>[]]

export default pop
