// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isArray = <T extends readonly any[], U>(arg: T | U): arg is T => Array.isArray(arg);

export default isArray;
