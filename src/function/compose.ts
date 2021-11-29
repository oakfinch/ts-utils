import type { Last } from '@oakfinch/ts-extra';
import { reverse } from '../array/reverse';

/* eslint-disable prettier/prettier, @typescript-eslint/no-explicit-any */
/**
 * Creates a function that returns the result of invoking the given functions,
 * (left-to-right), where each successive invocation is supplied the return
 * value of the previous.
 * 
 * @example
 * ```
 * import { pipe } from '@oakfinch/ts-utils'
 * 
 * const multiply20 = (price) => price * 20;
 * const divide100 = (price) => price / 100;
 * const normalizePrice = (price) => price.toFixed(2);
 * 
 * // instead of:
 * const discount = (price) => normalizePrice(divide100(multiply20(price)));
 * 
 * // you can do:
 * const discount = pipe(multiply20, divide100, normalizePrice);
 * ```
 */
export function pipe<T extends (...args: any[]) => any>(fn: T): T;
export function pipe<T0 extends (...args: any[]) => any, T1 extends (arg: ReturnType<T0>) => any>(fn0: T0, fn1: T1): (...args: Parameters<T0>) => ReturnType<T1>;
export function pipe<T0 extends (...args: any[]) => any, T1 extends (arg: ReturnType<T0>) => any, T2 extends (arg: ReturnType<T1>) => any>(fn0: T0, fn1: T1, fn2: T2): (...args: Parameters<T0>) => ReturnType<T2>;
export function pipe<T0 extends (...args: any[]) => any, T1 extends (arg: ReturnType<T0>) => any, T2 extends (arg: ReturnType<T1>) => any, T3 extends (arg: ReturnType<T2>) => any>(fn0: T0, fn1: T1, fn2: T2, fn3: T3): (...args: Parameters<T0>) => ReturnType<T3>;
export function pipe<T0 extends (...args: any[]) => any, T1 extends (arg: ReturnType<T0>) => any, T2 extends (arg: ReturnType<T1>) => any, T3 extends (arg: ReturnType<T2>) => any, T4 extends (arg: ReturnType<T3>) => any>(fn0: T0, fn1: T1, fn2: T2, fn3: T3, fn4: T4): (...args: Parameters<T0>) => ReturnType<T4>;
export function pipe<T0 extends (...args: any[]) => any, T1 extends (arg: ReturnType<T0>) => any, T2 extends (arg: ReturnType<T1>) => any, T3 extends (arg: ReturnType<T2>) => any, T4 extends (arg: ReturnType<T3>) => any, T5 extends (arg: ReturnType<T4>) => any>(fn0: T0, fn1: T1, fn2: T2, fn3: T3, fn4: T4, fn5: T5): (...args: Parameters<T0>) => ReturnType<T5>;
export function pipe<T0 extends (...args: any[]) => any, T1 extends (arg: ReturnType<T0>) => any, T2 extends (arg: ReturnType<T1>) => any, T3 extends (arg: ReturnType<T2>) => any, T4 extends (arg: ReturnType<T3>) => any, T5 extends (arg: ReturnType<T4>) => any, T6 extends (arg: ReturnType<T5>) => any>(fn0: T0, fn1: T1, fn2: T2, fn3: T3, fn4: T4, fn5: T5, fn6: T6): (...args: Parameters<T0>) => ReturnType<T6>;
export function pipe<T0 extends (...args: any[]) => any, T1 extends (arg: ReturnType<T0>) => any, T2 extends (arg: ReturnType<T1>) => any, T3 extends (arg: ReturnType<T2>) => any, T4 extends (arg: ReturnType<T3>) => any, T5 extends (arg: ReturnType<T4>) => any, T6 extends (arg: ReturnType<T5>) => any, T7 extends (arg: ReturnType<T6>) => any>(fn0: T0, fn1: T1, fn2: T2, fn3: T3, fn4: T4, fn5: T5, fn6: T6, fn7: T7): (...args: Parameters<T0>) => ReturnType<T7>;
export function pipe<T0 extends (...args: any[]) => any, T1 extends (arg: ReturnType<T0>) => any, T2 extends (arg: ReturnType<T1>) => any, T3 extends (arg: ReturnType<T2>) => any, T4 extends (arg: ReturnType<T3>) => any, T5 extends (arg: ReturnType<T4>) => any, T6 extends (arg: ReturnType<T5>) => any, T7 extends (arg: ReturnType<T6>) => any, T8 extends (arg: ReturnType<T7>) => any>(fn0: T0, fn1: T1, fn2: T2, fn3: T3, fn4: T4, fn5: T5, fn6: T6, fn7: T7, fn8: T8): (...args: Parameters<T0>) => ReturnType<T8>;
export function pipe<T0 extends (...args: any[]) => any, T1 extends (arg: ReturnType<T0>) => any, T2 extends (arg: ReturnType<T1>) => any, T3 extends (arg: ReturnType<T2>) => any, T4 extends (arg: ReturnType<T3>) => any, T5 extends (arg: ReturnType<T4>) => any, T6 extends (arg: ReturnType<T5>) => any, T7 extends (arg: ReturnType<T6>) => any, T8 extends (arg: ReturnType<T7>) => any, T9 extends (arg: ReturnType<T8>) => any>(fn0: T0, fn1: T1, fn2: T2, fn3: T3, fn4: T4, fn5: T5, fn6: T6, fn7: T7, fn8: T8, fn9: T9): (...args: Parameters<T0>) => ReturnType<T9>;
export function pipe<T0 extends (...args: any[]) => any, T1 extends (arg: ReturnType<T0>) => any, T2 extends (arg: ReturnType<T1>) => any, T3 extends (arg: ReturnType<T2>) => any, T4 extends (arg: ReturnType<T3>) => any, T5 extends (arg: ReturnType<T4>) => any, T6 extends (arg: ReturnType<T5>) => any, T7 extends (arg: ReturnType<T6>) => any, T8 extends (arg: ReturnType<T7>) => any, T9 extends (arg: ReturnType<T8>) => any, T10 extends (arg: ReturnType<T9>) => any>(fn0: T0, fn1: T1, fn2: T2, fn3: T3, fn4: T4, fn5: T5, fn6: T6, fn7: T7, fn8: T8, fn9: T9, fn10: T10): (...args: Parameters<T0>) => ReturnType<T10>;
export function pipe<T0 extends (...args: any[]) => any, T1 extends (arg: ReturnType<T0>) => any, T2 extends (arg: ReturnType<T1>) => any, T3 extends (arg: ReturnType<T2>) => any, T4 extends (arg: ReturnType<T3>) => any, T5 extends (arg: ReturnType<T4>) => any, T6 extends (arg: ReturnType<T5>) => any, T7 extends (arg: ReturnType<T6>) => any, T8 extends (arg: ReturnType<T7>) => any, T9 extends (arg: ReturnType<T8>) => any, T10 extends (arg: ReturnType<T9>) => any, TRest extends ((...args: any[]) => any)[]>(fn0: T0, fn1: T1, fn2: T2, fn3: T3, fn4: T4, fn5: T5, fn6: T6, fn7: T7, fn8: T8, fn9: T9, fn10: T10, ...rest: TRest): (...args: Parameters<T0>) => ReturnType<Last<TRest>>;
export function pipe<T extends ((...args: any[]) => any)[]>(...fns: T): (...args: any[]) => any {
  /* eslint-enable prettier/prettier, @typescript-eslint/no-explicit-any */
  if (fns.length === 0) {
    throw new Error('pipe requires at least one argument');
  }
  if (fns.length === 1) {
    return fns[0];
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return (...args) => fns.reduce((prev, fn, i) => (i === 0 ? fn(...args) : fn(prev)), 0);
}

/* eslint-disable prettier/prettier, @typescript-eslint/no-explicit-any */
/**
 * Creates a function that returns the result of invoking the given functions,
 * (right-to-left), where each successive invocation is supplied the return
 * value of the previous.
 * 
 * @example
 * ```
 * import { compose } from '@oakfinch/ts-utils'
 * 
 * const multiply20 = (price) => price * 20;
 * const divide100 = (price) => price / 100;
 * const normalizePrice = (price) => price.toFixed(2);
 * 
 * // instead of:
 * const discount = (price) => normalizePrice(divide100(multiply20(price)));
 * 
 * // you can do:
 * const discount = compose(normalizePrice, divide100, multiply20);
 * ```
 */
export function compose<T extends (...args: any[]) => any>(fn: T): T;
export function compose<T0 extends (...args: any[]) => any, T1 extends (arg: ReturnType<T0>) => any>(fn0: T1, fn1: T0): (...args: Parameters<T0>) => ReturnType<T1>;
export function compose<T0 extends (...args: any[]) => any, T1 extends (arg: ReturnType<T0>) => any, T2 extends (arg: ReturnType<T1>) => any>(fn0: T2, fn1: T1, fn2: T0): (...args: Parameters<T0>) => ReturnType<T2>;
export function compose<T0 extends (...args: any[]) => any, T1 extends (arg: ReturnType<T0>) => any, T2 extends (arg: ReturnType<T1>) => any, T3 extends (arg: ReturnType<T2>) => any>(fn0: T3, fn1: T2, fn2: T1, fn3: T0): (...args: Parameters<T0>) => ReturnType<T3>;
export function compose<T0 extends (...args: any[]) => any, T1 extends (arg: ReturnType<T0>) => any, T2 extends (arg: ReturnType<T1>) => any, T3 extends (arg: ReturnType<T2>) => any, T4 extends (arg: ReturnType<T3>) => any>(fn0: T4, fn1: T3, fn2: T2, fn3: T1, fn4: T0): (...args: Parameters<T0>) => ReturnType<T4>;
export function compose<T0 extends (...args: any[]) => any, T1 extends (arg: ReturnType<T0>) => any, T2 extends (arg: ReturnType<T1>) => any, T3 extends (arg: ReturnType<T2>) => any, T4 extends (arg: ReturnType<T3>) => any, T5 extends (arg: ReturnType<T4>) => any>(fn0: T5, fn1: T4, fn2: T3, fn3: T2, fn4: T1, fn5: T0): (...args: Parameters<T0>) => ReturnType<T5>;
export function compose<T0 extends (...args: any[]) => any, T1 extends (arg: ReturnType<T0>) => any, T2 extends (arg: ReturnType<T1>) => any, T3 extends (arg: ReturnType<T2>) => any, T4 extends (arg: ReturnType<T3>) => any, T5 extends (arg: ReturnType<T4>) => any, T6 extends (arg: ReturnType<T5>) => any>(fn0: T6, fn1: T5, fn2: T4, fn3: T3, fn4: T2, fn5: T1, fn6: T0): (...args: Parameters<T0>) => ReturnType<T6>;
export function compose<T0 extends (...args: any[]) => any, T1 extends (arg: ReturnType<T0>) => any, T2 extends (arg: ReturnType<T1>) => any, T3 extends (arg: ReturnType<T2>) => any, T4 extends (arg: ReturnType<T3>) => any, T5 extends (arg: ReturnType<T4>) => any, T6 extends (arg: ReturnType<T5>) => any, T7 extends (arg: ReturnType<T6>) => any>(fn0: T7, fn1: T6, fn2: T5, fn3: T4, fn4: T3, fn5: T2, fn6: T1, fn7: T0): (...args: Parameters<T0>) => ReturnType<T7>;
export function compose<T0 extends (...args: any[]) => any, T1 extends (arg: ReturnType<T0>) => any, T2 extends (arg: ReturnType<T1>) => any, T3 extends (arg: ReturnType<T2>) => any, T4 extends (arg: ReturnType<T3>) => any, T5 extends (arg: ReturnType<T4>) => any, T6 extends (arg: ReturnType<T5>) => any, T7 extends (arg: ReturnType<T6>) => any, T8 extends (arg: ReturnType<T7>) => any>(fn0: T8, fn1: T7, fn2: T6, fn3: T5, fn4: T4, fn5: T3, fn6: T2, fn7: T1, fn8: T0): (...args: Parameters<T0>) => ReturnType<T8>;
export function compose<T0 extends (...args: any[]) => any, T1 extends (arg: ReturnType<T0>) => any, T2 extends (arg: ReturnType<T1>) => any, T3 extends (arg: ReturnType<T2>) => any, T4 extends (arg: ReturnType<T3>) => any, T5 extends (arg: ReturnType<T4>) => any, T6 extends (arg: ReturnType<T5>) => any, T7 extends (arg: ReturnType<T6>) => any, T8 extends (arg: ReturnType<T7>) => any, T9 extends (arg: ReturnType<T8>) => any>(fn0: T9, fn1: T8, fn2: T7, fn3: T6, fn4: T5, fn5: T4, fn6: T3, fn7: T2, fn8: T1, fn9: T0): (...args: Parameters<T0>) => ReturnType<T9>;
export function compose<T0 extends (...args: any[]) => any, T1 extends (arg: ReturnType<T0>) => any, T2 extends (arg: ReturnType<T1>) => any, T3 extends (arg: ReturnType<T2>) => any, T4 extends (arg: ReturnType<T3>) => any, T5 extends (arg: ReturnType<T4>) => any, T6 extends (arg: ReturnType<T5>) => any, T7 extends (arg: ReturnType<T6>) => any, T8 extends (arg: ReturnType<T7>) => any, T9 extends (arg: ReturnType<T8>) => any, T10 extends (arg: ReturnType<T9>) => any>(fn0: T10, fn1: T9, fn2: T8, fn3: T7, fn4: T6, fn5: T5, fn6: T4, fn7: T3, fn8: T2, fn9: T1, fn10: T0): (...args: Parameters<T0>) => ReturnType<T10>;
export function compose<T0 extends (...args: any[]) => any, T1 extends (arg: ReturnType<T0>) => any, T2 extends (arg: ReturnType<T1>) => any, T3 extends (arg: ReturnType<T2>) => any, T4 extends (arg: ReturnType<T3>) => any, T5 extends (arg: ReturnType<T4>) => any, T6 extends (arg: ReturnType<T5>) => any, T7 extends (arg: ReturnType<T6>) => any, T8 extends (arg: ReturnType<T7>) => any, T9 extends (arg: ReturnType<T8>) => any, T10 extends (arg: ReturnType<T9>) => any, TRest extends ((...args: any[]) => any)[]>(fn0: T10, fn1: T9, fn2: T8, fn3: T7, fn4: T6, fn5: T5, fn6: T4, fn7: T3, fn8: T2, fn9: T1, fn10: T0, ...rest: TRest): (...args: Parameters<Last<TRest>>) => ReturnType<T10>;
export function compose(...fns: ((...args: any[]) => any)[]): ((...args: any[]) => any) {
  /* eslint-enable prettier/prettier, @typescript-eslint/no-explicit-any */
  if (fns.length === 0) {
    throw new Error('compose requires at least one argument');
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return pipe(...reverse(fns));
}
