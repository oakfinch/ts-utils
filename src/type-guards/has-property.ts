import type { Index } from '@oakfinch/ts-extra'

/**
 * Type-garded property check
 *
 * @param obj the object
 * @param prop the property to check
 * @example
 * ```
 * const obj = getObjSomehow() as ({ foo: 'foo' } | { bar: 'bar' });
 *
 * // TypeError:
 * // Property 'foo' does not exist on type '{ foo: "foo"; } | { bar: "bar"; }'
 * console.log(obj.foo);
 *
 * if (hasProperty(obj, 'foo')) {
 *   // ok!
 *   console.log(obj.foo);
 * }
 * ```
 */
export const hasProperty = <TProp extends Index, TValue, U, V extends Record<TProp, TValue>>(
  obj: U | V,
  prop: TProp
): obj is V => {
  try {
    return prop in obj
  } catch {
    return false
  }
}

export default hasProperty
