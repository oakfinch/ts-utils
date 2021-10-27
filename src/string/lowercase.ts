export const lowercase = <T extends string>(str: T): Lowercase<T> =>
  str.toLowerCase() as Lowercase<T>;

export default lowercase;
