import type { Reverse, AnyArray } from '@oakfinch/ts-extra';

export const reverse = <T extends AnyArray>(arr: T): Reverse<T> => [...arr].reverse() as Reverse<T>;
export default reverse;
