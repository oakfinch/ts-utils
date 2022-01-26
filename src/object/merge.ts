/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AnyObject } from '@oakfinch/ts-extra'
import { isObject } from '../type-guards/is-object'
import { unique } from '../array/unique'

type DeepMerge<T, U> = T extends readonly any[]
  ? U extends readonly any[]
    ? [...T, ...U]
    : never
  : T extends AnyObject
  ? U extends AnyObject
    ? { [P in keyof T | keyof U]: DeepMerge<T[P], U[P]> }
    : never
  : U

export function merge<T extends AnyObject, U extends AnyObject>(
  a: T,
  b: U,
  options?: { deep?: false }
): T & U
export function merge<T extends AnyObject, U extends AnyObject>(
  a: T,
  b: U,
  options?: { deep: true }
): DeepMerge<T, U>
export function merge<T extends AnyObject, U extends AnyObject>(
  a: T,
  b: U,
  { deep = false } = {}
): (T & U) | DeepMerge<T, U> {
  if (Array.isArray(a) && Array.isArray(b)) {
    return [...a, ...b] as DeepMerge<T, U>
  }
  if (isObject(a) && isObject(b)) {
    if (deep === false) {
      return {
        ...a,
        ...b,
      }
    }
    return Object.fromEntries(
      unique([...Object.keys(a), ...Object.keys(b)]).map(
        key => [key, merge(a[key], b[key], { deep: true })] as const
      )
    ) as DeepMerge<T, U>
  }
  return b as DeepMerge<T, U>
}

export default merge
