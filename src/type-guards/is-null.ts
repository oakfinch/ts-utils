/** null type guard */
export const isNull = <T>(obj: T | null): obj is null => typeof obj === 'object' && obj === null
export default isNull
