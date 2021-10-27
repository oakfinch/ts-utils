import type { AnyArray, AnyObject } from '@oakfinch/ts-extra';
import { isObject, isArray } from '../type-guards';

const cloneHelper = <T>(obj: T, cache = new Map()): T => {
  if (['undefined', 'number', 'string', 'boolean'].includes(typeof obj)) {
    return obj;
  }

  if (typeof obj === 'object' && obj === null) {
    return obj;
  }

  if (cache.has(obj)) {
    return cache.get(obj) as T;
  }

  try {
    const cloned = JSON.parse(JSON.stringify(obj)) as T;
    cache.set(obj, cloned);
    return cloned;
    // eslint-disable-next-line no-empty
  } catch {}

  if (isArray(obj)) {
    const cloned = [] as AnyArray;
    cache.set(obj, cloned);
    obj.forEach(item => cloned.push(cloneHelper(item, cache)));
    return cloned as unknown as T;
  }

  if (isObject(obj)) {
    const cloned = {} as AnyObject;
    cache.set(obj, cloned);
    Object.entries(obj).forEach(([key, value]) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      cloned[cloneHelper(key, cache)] = cloneHelper(value, cache);
    });
    return cloned as unknown as T;
  }

  throw new Error('could not clone object');
};

export const clone = <T>(obj: T): T => cloneHelper(obj);
export default clone;
