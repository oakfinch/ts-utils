/** nullish (`null` or `undefined`) type-guard */
export const isNullish = <T>(arg: T | null | undefined): arg is null | undefined =>
  typeof arg === 'undefined' || arg === null

export default isNullish
