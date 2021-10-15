/* eslint-disable @typescript-eslint/no-explicit-any */
import { isPromise } from './is-promise';
import { isFunction } from './is-function';

/**
 * A helper for handling awkward try/catch blocks
 *
 * @param fn - a function that has no arguments and returns a promise
 * @returns a promise that resolves to [undefined, error] if the promise rejects,
 *          and [value, undefined] if the promise resolves
 * @example
 * ```
 * // instead of:
 * let value: string;
 * try {
 *   value = await getValue(12345);
 * } catch (error) {
 *   value = 'some fallback';
 * }
 *
 * // you can do:
 * const [value = 'some fallback', error] = await to(() => getValue(12345));
 *
 * ```
 */
export function to<T>(fn: () => Promise<T>): Promise<[T, undefined] | [undefined, unknown]>;
/**
 * A helper for handling awkward try/catch blocks
 * @param fn - a function that has no arguments
 * @returns [undefined, error] if function throws an error, and [value, undefined] if it succeeds
 * @example
 * ```
 * // instead of:
 * let value: string;
 * try {
 *   value = getValue(12345);
 * } catch (error) {
 *   value = 'some fallback';
 * }
 *
 * // you can do:
 * const [value = 'some fallback', error] = to(() => getValue(12345));
 *
 * ```
 */
export function to<T>(fn: () => T): [T, undefined] | [undefined, unknown];
/**
 * A helper for handling awkward try/catch blocks
 *
 * @param promise - a promise
 * @returns [undefined, error] if the promise rejects, and [value, undefined] if it resolves
 * @example
 * ```
 * // instead of:
 * let value: string;
 * try {
 *   value = await somePromise;
 * } catch (error) {
 *   value = 'some fallback';
 * }
 *
 * // you can do:
 * const [value = 'some fallback', error] = to(somePromise);
 *
 * ```
 */
export function to<T>(promise: Promise<T>): Promise<[T, undefined] | [undefined, unknown]>;
export function to<
  T,
  U0 extends () => Promise<T>,
  U1 extends () => T,
>(arg: U0 | U1 | Promise<T> | T): (
[T, undefined] |
[undefined, unknown] |
Promise<[T, undefined] | [undefined, unknown]>
) {
  if (isPromise(arg)) {
    return arg.then(
      (value) => [value, undefined],
      (error) => [undefined, error],
    );
  }

  if (isFunction(arg)) {
    try {
      const value = arg();
      if (isPromise(value)) {
        return to(value);
      }
      return [value, undefined];
    } catch (error) {
      return [undefined, error];
    }
  }

  return [arg, undefined];
}

export default to;
