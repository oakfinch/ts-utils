import type { AnyArray, AnyFunction, Slice } from '@oakfinch/ts-extra';

/**
 * Creates a function that invokes `fn` with the `args` prepended to the
 * arguments that it recieves.
 *
 * @param fn - the original function
 * @param {...any} args - arguments that will be partially applied
 * @example
 * ```
 * import { partial } from '@oakfinch/ts-utils'
 *
 * const original = (a, b, c, d) = a + b + c + d;
 *
 * // instead of:
 * const fn = (a) = original(1, 2, 3, a);
 *
 * // you can do:
 * const fn = partial(original, 1, 2, 3);
 * ```
 */
export function partial<T extends AnyFunction>(fn: T): T;
export function partial<
  T extends Readonly<AnyArray>,
  U extends Readonly<AnyArray>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  V extends (...args: [...T, ...U]) => any
>(fn: V, ...args: T): (...rest: Slice<Parameters<V>, T['length']>) => ReturnType<V>;
export function partial(fn: AnyFunction, ...args: AnyArray): AnyFunction {
  return args.length === 0 ? fn : fn.bind(null, ...args);
}

export default partial;
