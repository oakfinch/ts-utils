import type { AnyObject, Index } from '@oakfinch/ts-extra'
import { PUBLIC_CONFIG, PRIVATE_CONFIG } from './constants'

const getDescriptors = <T>(props: { [i: Index]: T } = {}, { isPublic = true } = {}) =>
  Object.entries(props).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: { value, ...(isPublic ? PUBLIC_CONFIG : PRIVATE_CONFIG) },
    }),
    {}
  )

export function create<T extends AnyObject>(obj: T): T
export function create<T extends AnyObject>(
  obj: T,
  options: { prototype?: null; isPublic?: true }
): T
export function create<T extends AnyObject>(
  obj: T,
  options: { prototype?: null; isPublic: false }
): Record<string, never>
export function create<T extends AnyObject, U extends AnyObject>(
  obj: T,
  options: { prototype: U; isPublic?: true }
): T & U
export function create<T extends AnyObject, U extends AnyObject>(
  obj: T,
  options: { prototype: U; isPublic: false }
): U
export function create<T extends AnyObject, U extends AnyObject>(
  obj: T,
  { prototype = null, isPublic = true }: { prototype?: U | null; isPublic?: boolean } = {}
): U & T {
  return Object.create(prototype, getDescriptors(obj, { isPublic })) as U & T
}
