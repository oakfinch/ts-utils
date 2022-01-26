/** String type guard */
export const isString = <T>(arg: T | string): arg is string => typeof arg === 'string'

export default isString
