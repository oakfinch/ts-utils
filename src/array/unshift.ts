import type { Unshift } from '@oakfinch/ts-extra';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const unshift = <T extends readonly any[]>(arr: T): Unshift<T> => [
  arr[0],
  arr.slice(1),
] as Unshift<T>;

export default unshift;
