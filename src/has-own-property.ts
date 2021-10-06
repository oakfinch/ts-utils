import { AnyFunction, Index } from '@oakfinch/ts-extra';

export const hasOwnProperty = <
  T0 extends Index,
  T1,
  U extends AnyFunction,
  V extends AnyFunction & Record<T0, T1>,
>(fn: U | V, prop: T0): fn is V => Object.hasOwnProperty.call(fn, prop);

export default hasOwnProperty;
