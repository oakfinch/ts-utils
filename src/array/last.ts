import type { Last } from '@oakfinch/ts-extra'

/**
 * Returns the last item of an array
 *
 * @example
 * ```
 * const array = ['foo', 'bar'] as const;
 * const obj = { bar: 'fizzbuzz' } as const;
 *
 * // TypeError: Element implicitly has an 'any' type because expression of type
 * // '"foo" | "bar"' can't be used to index type '{ readonly bar: "fizzbuzz"; }'.
 * //     Property 'foo' does not exist on type '{ readonly bar: "fizzbuzz"; }'
 * const fizzbuzz = obj[array[array.length - 1]];
 *
 * // ok!
 * const fizzbuzz = obj[last(array)];
 * ```
 */
export const last = <T, U extends readonly T[]>(arr: U): Last<U> => arr[arr.length - 1]

export default last
