import type { AnyObject, Length, AnyArray, AnyFunction } from '@oakfinch/ts-extra'
import { isObject } from '../type-guards/is-object'
import { isArray } from '../type-guards/is-array'

type Freeze<T> = T extends readonly (infer U)[]
  ? Readonly<Length<T> extends never ? U[] : { [P in keyof T]: Freeze<T[P]> }>
  : T extends AnyFunction
  ? T
  : T extends AnyObject
  ? { readonly [P in keyof T]: Freeze<T[P]> }
  : T

export function freeze<T extends Readonly<AnyArray>>(obj: T): Freeze<T>
export function freeze<T>(obj: T): Freeze<T>
export function freeze<T, U>(obj: T | Readonly<U[]>): Freeze<T | U[]> {
  if (isArray(obj)) {
    return Object.freeze(obj.map(item => freeze(item))) as Freeze<U[]>
  }

  if (isObject(obj)) {
    return Object.freeze(
      Object.fromEntries(Object.entries(obj).map(([key, val]) => [key, freeze(val)] as const))
    ) as Freeze<T>
  }

  return obj
}

export default freeze
