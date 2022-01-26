export const uncapitalize = <T extends string>(str: T): Uncapitalize<T> =>
  str.replace(/^./, c => c.toLowerCase()) as Uncapitalize<T>

export default uncapitalize
