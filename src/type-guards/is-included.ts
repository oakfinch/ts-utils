import type { ArrayItem, AnyArray } from '@oakfinch/ts-extra'

/**
 * Type-garded Array.includes
 *
 * @param item the item to search for
 * @param array the array to search
 * @example
 * ```
 * const validItems = ['a', 'b'] as const;
 * const array = getArraySomehow() as string[];
 *
 * // TypeError: Argument of type 'string' is not assignable to parameter of type '"a" | "b"
 * const filtered = array.filter((item) => validItems.includes(item));
 *
 * // ok!
 * const filtered = array.filter((item) => isIncluded(item, validItems));
 * ```
 */
export const isIncluded = <T extends Readonly<AnyArray>, U extends ArrayItem<T>, V>(
  item: U | V,
  array: T
): item is U => array.includes(item)

export default isIncluded
