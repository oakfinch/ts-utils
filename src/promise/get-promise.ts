/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Returns a promise along with the `resolve` and `reject` methods that
 * control it.
 *
 * @example
 * ```
 * const {promise, resolve, reject} = getPromise<{x: number, y: number}>()
 *
 * element.addEventListener('click', ({ clientX: x, clientY: y }) => {
 *   resolve({ x, y })
 * })
 *
 * const { x, y } = await promise
 * ```
 */
export const getPromise = <T = void>(): {
  promise: Promise<T>
  resolve: (value: T) => T
  reject: (reason?: any) => never
} => {
  // these default assignments are reassigned immediately in the body of the
  // promise, so they will never be called.
  let resolve = undefined as unknown as (value: T) => T
  let reject = undefined as unknown as (reason?: any) => never

  const promise = new Promise<T>((res, rej) => {
    resolve = value => {
      res(value)
      return value
    }
    reject = reason => {
      rej(reason)
      return undefined as never
    }
  })
  return { promise, resolve, reject }
}

export default getPromise
