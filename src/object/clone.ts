/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { isObject, isArray, isPrimitive } from '../type-guards';
import { safe } from '../function/safe';

const jsonClone = <T>(obj: T) =>
  safe(() => (isObject(obj) || isArray(obj) ? JSON.parse(JSON.stringify(obj)) : undefined));

const arrayClone = <T>(cache: Map<any, any>, clone: <U>(obj: U) => U, obj: T) =>
  isArray(obj)
    ? obj.reduce((acc: any[], item) => {
        acc.push(clone(item));
        return acc;
      }, cache.set(obj, []).get(obj))
    : undefined;

const objectClone = <T>(cache: Map<any, any>, clone: <U>(obj: U) => U, obj: T): T | undefined =>
  isObject(obj)
    ? Object.entries(obj).reduce(
        (acc, [key, value]) => Object.assign(acc, { [clone(key)]: clone(value) }),
        cache.set(obj, {}).get(obj)
      )
    : undefined;

const cloneHelper = <T, U extends Map<any, any>>(cache: U, obj: T): T => {
  if (isPrimitive(obj)) {
    return obj;
  }

  const result =
    cache.get(obj) ??
    jsonClone(obj) ??
    arrayClone(cache, <T0>(o: T0): T0 => cloneHelper(cache, o), obj) ??
    objectClone(cache, <T0>(o: T0): T0 => cloneHelper(cache, o), obj);

  if (typeof result === 'undefined') {
    throw new Error('could not clone object');
  }

  return result;
};

export const clone = <T>(obj: T): T => cloneHelper(new Map(), obj);
export default clone;
