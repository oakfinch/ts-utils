import type { Index } from '@oakfinch/ts-extra';

/**
 * Type-garded Object.hasOwnProperty
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
 * if (hasOwnProperty(obj, 'foo')) {
 *   // ok!
 *   console.log(obj.foo);
 * }
 * ```
 */
export const hasOwnProperty = <TProp extends Index, TValue, U, V extends Record<TProp, TValue>>(
  obj: U | V,
  prop: TProp
): obj is V => Object.hasOwnProperty.call(obj, prop);

export default hasOwnProperty;
