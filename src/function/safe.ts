/**
 * A helper for handling awkward try/catch blocks
 *
 * @param fn - a function that has no arguments
 * @returns the return value of `fn`, or `undefined` if `fn` throws an error
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
 * const value = safe(() => getValue(12345)) ?? 'some fallback';
 *
 * ```
 */
export const safe = <T>(fn: () => T): T | undefined => {
  try {
    return fn()
  } catch {
    return undefined
  }
}

export default safe
