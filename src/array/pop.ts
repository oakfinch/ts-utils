import type { Pop } from '@oakfinch/ts-extra';
import { last } from './last';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const pop = <T extends readonly any[]>(arr: T): Pop<T> => [
  last(arr),
  arr.slice(0, arr.length - 1),
] as Pop<T>;

export default pop;
