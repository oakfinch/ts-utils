/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AnyFunction, FromEntries, MergeArrays, FromArgs } from '@oakfinch/ts-extra';

/**
 * Takes in a callback-based function and returns a promise-based function
 *
 * The callback must be a node-style callback whose first argument is an
 * error when the function fails, or null when it succeeds. The second argument
 * is the result.
 *
 * @param fn the callback-based function to promisify
 * @returns a promise-based function
 * @example
 * ```
 * // https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback
 * import { readFile } from 'fs'
 * import { promisify } from '@oakfinch/ts-utils'
 *
 * // reading a file using a promisified `readFile`
 * const readFilePromise = promisify(readFile)
 * const contents = await readFilePromise('/some/file', 'utf8')
 *
 * // reading a file using the callback-based `readFile`
 * const contents = await new Promise((resolve, reject) => {
 *   readFile('/some/file', 'utf8', (err, data) => {
 *     if (err) {
 *       reject(err)
 *     } else {
 *       resolve(data)
 *     }
 *   })
 * })
 * ```
 */
export function promisify<
  TArgs extends any[],
  TReturn extends any[],
  TCustomNames extends readonly string[]
>(
  fn: (...args: [...TArgs, (error: any, ...rest: TReturn) => any]) => any,
  keys: TCustomNames
): (...args: TArgs) => Promise<FromEntries<MergeArrays<TCustomNames, FromArgs<TReturn>>>>;

export function promisify<TReturn extends any[], TCustomNames extends readonly string[]>(
  fn: (cb: (error: any, ...rest: TReturn) => any) => any,
  keys: TCustomNames
): () => Promise<FromEntries<MergeArrays<TCustomNames, FromArgs<TReturn>>>>;

export function promisify<TArgs extends any[], TReturn>(
  fn: (...args: [...TArgs, (error: any, value: TReturn | undefined, ...rest: any[]) => any]) => any
): (...args: TArgs) => Promise<TReturn>;

export function promisify<TReturn>(
  fn: (cb: (error: any, value: TReturn | undefined, ...rest: any[]) => any) => any
): () => Promise<TReturn>;

export function promisify<TArgs extends any[]>(
  fn: (...args: [...TArgs, (error: any) => any]) => any
): (...args: TArgs) => Promise<void>;

export function promisify(fn: (cb: (error: any) => any) => any): () => Promise<void>;

export function promisify<T extends AnyFunction>(
  fn: T,
  keys?: string[]
): (...args: any[]) => Promise<any> {
  return (...args: any[]) =>
    new Promise((resolve, reject) => {
      fn(...args, (error: any, ...rest: any[]) => {
        if (error) {
          reject(error);
        } else if (keys) {
          resolve(
            Object.fromEntries(
              keys
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                .map((key, index) => [key, rest[index]])
                .slice(0, rest.length)
            )
          );
        } else if (rest.length === 1) {
          resolve(rest[0]);
        } else {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          resolve();
        }
      });
    });
}

export default promisify;
