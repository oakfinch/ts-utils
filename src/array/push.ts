// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const push = <T extends readonly any[], U>(arr: T, item: U): [...T, U] => [...arr, item];
export default push;
