// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const shift = <T extends readonly any[], U>(arr: T, item: U): [U, ...T] => [item, ...arr]
export default shift
