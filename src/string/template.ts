import type { Value } from '@oakfinch/ts-extra'

/**
 * Simple tagged template literal that returns a string render function
 *
 * @example
 * ```
 * import { template } from '@oakfinch/ts-utils'
 *
 * const greet = template`${'greeting'}, how are you today ${'name'}?`;
 *
 * // returns 'Hello, how are you today Bob?'
 * greet({ greeting: 'Hello', name: 'Bob' });
 *
 * // returns 'Good afternoon, how are you today Sally?'
 * greet({ greeting: 'Good afternoon', name: 'Sally' });
 * ```
 */
export const template =
  <T extends readonly string[]>(strings: TemplateStringsArray, ...expressions: T) =>
  (replacements: { [P in Value<T>]: string }): string =>
    strings
      .map((str, index) => [str, expressions[index]] as [string, Value<T>])
      .map(([str, exp]) => [str, replacements[exp] ?? ''].join(''))
      .join('')

export default template
