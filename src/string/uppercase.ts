export const uppercase = <T extends string>(str: T): Uppercase<T> =>
  str.toUpperCase() as Uppercase<T>

export default uppercase
