/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AnyFunction, FromEntries, MergeArrays, FromArgs,
} from '@oakfinch/ts-extra';
import { CUSTOM_PROMISIFIED_ARGS_SYMBOL } from './constants';
import { hasOwnProperty } from './has-own-property';

export function promisify<
    TArgs extends any[],
    TReturn extends any[],
    TCustomNames extends readonly string[],
  >(
  fn: (
    ((...args: [...TArgs, (error: any, ...rest: TReturn) => any]) => any) &
    { [CUSTOM_PROMISIFIED_ARGS_SYMBOL]: TCustomNames }
  )
): (...args: TArgs) => Promise<FromEntries<MergeArrays<TCustomNames, FromArgs<TReturn>>>>;

export function promisify<
    TReturn extends any[],
    TCustomNames extends readonly string[],
  >(
  fn: (
    ((cb: (error: any, ...rest: TReturn) => any) => any) &
    { [CUSTOM_PROMISIFIED_ARGS_SYMBOL]: TCustomNames }
  )
): () => Promise<FromEntries<MergeArrays<TCustomNames, FromArgs<TReturn>>>>;

export function promisify<TArgs extends any[], TReturn>(
  fn: (...args: [
    ...TArgs,
    (error: any, value: TReturn | undefined, ...rest: any[]) => any,
  ]) => any
): (...args: TArgs) => Promise<TReturn>;

export function promisify<TReturn>(
  fn: (cb: (error: any, value: TReturn | undefined, ...rest: any[]) => any) => any
): () => Promise<TReturn>;

export function promisify<TArgs extends any[]>(
  fn: (...args: [
    ...TArgs,
    (error: any) => any,
  ]) => any
): (...args: TArgs) => Promise<void>;

export function promisify(
  fn: (cb: ((error: any) => any)) => any
): () => Promise<void>;

export function promisify<
  T extends AnyFunction,
>(fn: T): (...args: any[]) => Promise<any> {
  return (...args: any[]) => new Promise((resolve, reject) => {
    fn(...args, (error: any, ...rest: any[]) => {
      if (error) {
        reject(error);
      } else if (rest.length > 1 && hasOwnProperty(fn, CUSTOM_PROMISIFIED_ARGS_SYMBOL)) {
        const keys = fn[CUSTOM_PROMISIFIED_ARGS_SYMBOL] as string[];
        resolve(Object.fromEntries(
          keys
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            .map((key, index) => [key, rest[index]])
            .slice(0, rest.length),
        ));
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
