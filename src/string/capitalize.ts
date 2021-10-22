export const capitalize = <T extends string>(
  str: T,
): Capitalize<T> => str.replace(/^./, (c) => c.toUpperCase()) as Capitalize<T>;

export default capitalize;
