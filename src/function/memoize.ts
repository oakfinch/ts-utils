/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { AnyArray, AnyFunction } from '@oakfinch/ts-extra'

export const memoize = <T extends AnyFunction>(fn: T, maxAge = 1000): T => {
  const cache = new Map()

  return ((...args: AnyArray) => {
    const key = args.length === 1 ? args[0] : JSON.stringify(args)
    const { value, timeout } = cache.has(key)
      ? cache.get(key)
      : { value: fn(...(args as Parameters<T>)), timeout: null }

    if (timeout) {
      clearTimeout(timeout as NodeJS.Timeout)
    }

    cache.set(key, {
      value,
      timeout: setTimeout(() => {
        cache.delete(key)
      }, maxAge),
    })

    return value
  }) as T
}

export default memoize
