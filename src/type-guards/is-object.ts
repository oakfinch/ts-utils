import { AnyObject } from '@oakfinch/ts-extra';

/** object type guard */
export const isObject = <T extends AnyObject, U>(
  obj: T | U,
): obj is T => typeof obj === 'object' && obj !== null;

export default isObject;
