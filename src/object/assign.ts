import type { AnyObject, AnyArray, Intersection } from '@oakfinch/ts-extra';

export const assign = <T extends AnyObject, U extends AnyArray>(
  target: T,
  ...sources: U
): Intersection<T | U[number]> => Object.assign(target, ...sources) as Intersection<T | U[number]>;

export default assign;
