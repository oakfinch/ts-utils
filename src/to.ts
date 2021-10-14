/* eslint-disable @typescript-eslint/no-explicit-any */
import { isPromise } from './is-promise';
import { isFunction } from './is-function';

/**
 * A helper for handling awkward try/catch blocks
 *
 * @param fn - a function that has no arguments and returns a promise
 * @returns a promise that resolves to [reason, undefined] if the promise rejects,
 *          and [undefined, value] if the promise resolves
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
 * const [error, value = 'some fallback'] = await to(() => getValue(12345));
 *
 * ```
 */
export function to<T>(fn: () => Promise<T>): Promise<[unknown, undefined] | [undefined, T]>;
/**
 * A helper for handling awkward try/catch blocks
 * @param fn - a function that has no arguments
 * @returns [error, undefined] if function throws an error, and [undefined, value] if it succeeds
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
 * const [error, value = 'some fallback'] = to(() => getValue(12345));
 *
 * ```
 */
export function to<T>(fn: () => T): [unknown, undefined] | [undefined, T];
/**
 * A helper for handling awkward try/catch blocks
 *
 * @param promise - a promise
 * @returns [error, undefined] if the promise rejects, and [undefined, value] if it resolves
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
 * const [error, value = 'some fallback'] = to(somePromise);
 *
 * ```
 */
export function to<T>(promise: Promise<T>): Promise<[unknown, undefined] | [undefined, T]>;
export function to<
  T,
  U0 extends () => Promise<T>,
  U1 extends () => T,
>(arg: U0 | U1 | Promise<T> | T): (
[any, undefined] |
[undefined, T] |
Promise<[any, undefined] | [undefined, T]>
) {
  if (isPromise(arg)) {
    return arg.then(
      (resolved) => [undefined, resolved],
      (error) => [error, undefined],
    );
  }

  if (isFunction(arg)) {
    try {
      const result = arg();
      if (isPromise(result)) {
        return to(result);
      }
      return [undefined, result];
    } catch (error) {
      return [error, undefined];
    }
  }

  return [undefined, arg];
}

export default to;
