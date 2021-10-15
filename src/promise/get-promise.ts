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
  promise: Promise<T>;
  resolve: (value: T | PromiseLike<T>) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reject: (reason?: any) => void;
} => {
  let resolve: (value: T | PromiseLike<T>) => void = () => {};
  let reject: (reason?: unknown) => void = () => {};
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
};

export default getPromise;
