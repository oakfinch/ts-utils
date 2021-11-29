import type { Intersection } from '@oakfinch/ts-extra';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const assign = <T extends any[]>(...args: T): Intersection<T[number]> =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  Object.assign(...args) as Intersection<T[number]>;

export default assign;
