/**
 * Primitive type guard
 *
 * JS Primitives are: string | number | bigint | boolean | undefined | symbol | null
 */
export const isPrimitive = <T>(
  obj: T | string | number | bigint | boolean | undefined | symbol | null
): obj is string | number | bigint | boolean | undefined | symbol | null =>
  ['string', 'number', 'bigint', 'boolean', 'undefined', 'symbol'].includes(typeof obj) ||
  (typeof obj === 'object' && obj === null)

export default isPrimitive
