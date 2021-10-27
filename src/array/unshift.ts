/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Value } from '@oakfinch/ts-extra';

/**
 * Similar to Array.pop, but returns an array along with the "popped" item
 * instead of modifying the original array.
 *
 * @example
 * ```
 * const original = [1, 2, 3, 4, 5];
 * const [last, modified] = pop(original);
 * // original == [1, 2, 3, 4, 5]
 * // modified == [1, 2, 3, 4]
 * // last == 5
 *
 * // as opposed to:
 * const original = [1, 2, 3, 4, 5]
 * const last = original.pop();
 * // original == [1, 2, 3, 4]
 * // last == 5
 * ```
 */
export const unshift = <T extends readonly any[]>(
  arr: T
): T extends readonly [infer T0, ...infer T1] ? [T1, T0] : [Value<T>, Value<T>[]] =>
  [arr[0], arr.slice(1)] as T extends readonly [infer T0, ...infer T1]
    ? [T1, T0]
    : [Value<T>, Value<T>[]];

export default unshift;
