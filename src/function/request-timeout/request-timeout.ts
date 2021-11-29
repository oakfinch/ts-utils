/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AnyFunction } from '@oakfinch/ts-extra';
import { assign } from '../../object/assign';
import { getPromise } from '../../promise/get-promise';
import { isObject } from '../../type-guards/is-object';
import { getTimeout } from './helpers';
import { IDLE } from './constants';
import type { RequestCallback, TimeoutType, Idle, AnimationFrame } from './types';

/**
 * A combined interface for setTimeout, requestIdleCallback, and
 * requestAnimationFrame
 *
 * @param fn callback function
 * @param type callback type. `idle`, `animationFrame`, or a number of
 *             milliseconds
 * @returns returns a promise-like function that, when called, will cancel the
 *          timeout. When `await`-ed, it will resolve with the return value of
 *          the callback once it is called, or will reject
 *
 * @example
 * ```
 * import { timeout } from '@oakfinch/ts-utils'
 *
 * timeout(() => { console.log('this will be called when idle') })
 *
 * await timeout(() => { console.log('you can await the result as well') })
 *
 * timeout(
 *   () => { console.log('this calls requestIdleCallback') },
 *   'idle'
 * )
 *
 * timeout(
 *   () => { console.log('this calls requestAnimationFrame') },
 *   'animationFrame'
 * )
 *
 * timeout(
 *   () => { console.log('this calls setTimeout') },
 *   100
 * )
 *
 * const { cancel } = timeout(
 *   () => { console.log('this will be canceled!') },
 *   100
 * )
 * cancel()
 *
 * const promise = timeout(
 *   () => {
 *     console.log('this will be canceled and the promise will reject')
 *   },
 *   100
 * )
 * timeout(() => { promise.cancel({ error: true }) })
 * await promise
 *
 * ```
 */
export function requestTimeout(
  fn: RequestCallback<Idle>
): Promise<void> & { cancel: (options?: { error?: any }) => true };
export function requestTimeout(
  fn: RequestCallback<Idle>,
  type: Idle
): Promise<void> & { cancel: (options?: { error?: any }) => true };
export function requestTimeout(
  fn: RequestCallback<Idle>,
  options: IdleRequestOptions
): Promise<void> & { cancel: (options?: { error?: any }) => true };
export function requestTimeout(
  fn: RequestCallback<AnimationFrame>,
  type: AnimationFrame
): Promise<void> & { cancel: (options?: { error?: any }) => true };
export function requestTimeout(
  fn: RequestCallback<number>,
  type: number
): Promise<void> & { cancel: (options?: { error?: any }) => true };
export function requestTimeout(
  fn: RequestCallback<number | TimeoutType>,
  typeOrOptions: number | TimeoutType | IdleRequestOptions = IDLE
): Promise<void> & { cancel: (options?: { error?: any }) => true } {
  const { resolve, reject, promise } = getPromise();
  const [type, options] = isObject(typeOrOptions)
    ? ([IDLE, typeOrOptions] as const)
    : ([typeOrOptions, undefined] as const);

  const [request, clear] = getTimeout(type, options);
  const id = request((...args) => {
    try {
      (fn as AnyFunction)(...args);
      resolve();
    } catch (error) {
      reject(error);
    }
  });

  const cancel = ({ error = false } = {}): true => {
    clear(id);
    if (error) {
      reject(error);
    }
    return true;
  };

  return assign(promise, { cancel });
}

export default requestTimeout;
