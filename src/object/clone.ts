import { isObject, isArray, isPrimitive } from '../type-guards';
import { safe } from '../function/safe';

const init = <T, U>(item: T, initialValue: U, cache: Map<T, T>): T =>
  cache.set(item, initialValue as unknown as T).get(item) as T;

const jsonClone = <T>(obj: T): T | undefined =>
  safe(() => (isObject(obj) || isArray(obj) ? (JSON.parse(JSON.stringify(obj)) as T) : undefined));

const arrayClone = <T, U extends Map<T, T>>(
  obj: T,
  cache: U,
  clone: (obj: T) => T
): T | undefined =>
  isArray(obj)
    ? obj.reduce(
        (acc: T, item) => [...(acc as unknown as unknown[]), clone(item as T)] as unknown as T,
        init(obj, [], cache)
      )
    : undefined;

const objectClone = <T, U extends Map<T, T>>(
  obj: T,
  cache: U,
  clone: (obj: T) => T
): T | undefined =>
  isObject(obj)
    ? Object.entries(obj).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: clone(value as unknown as T),
        }),
        init(obj, {}, cache)
      )
    : undefined;

const cloneWithCache = <T, U extends Map<T, T>>(obj: T, cache: U): T => {
  if (isPrimitive(obj)) {
    return obj;
  }

  const result =
    cache.get(obj) ??
    jsonClone(obj) ??
    arrayClone(obj, cache, o => cloneWithCache(o, cache)) ??
    objectClone(obj, cache, o => cloneWithCache(o, cache));

  if (typeof result === 'undefined') {
    throw new Error('could not clone object');
  }

  return result;
};

export const clone = <T>(obj: T): T => cloneWithCache(obj, new Map());
export default clone;
