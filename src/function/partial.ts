/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AnyArray, AnyFunction, Slice } from '@oakfinch/ts-extra';

export function partial<T extends AnyFunction>(fn: T): T;
export function partial<
  T extends Readonly<AnyArray>,
  U extends Readonly<AnyArray>,
  V extends (...args: [...T, ...U]) => any
>(fn: V, ...args: T): (...rest: Slice<Parameters<V>, T['length']>) => ReturnType<V>;
export function partial(fn: AnyFunction, ...args: AnyArray): AnyFunction {
  return args.length === 0 ? fn : fn.bind(null, ...args);
}

export default partial;
