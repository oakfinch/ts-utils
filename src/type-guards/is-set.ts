/* eslint-disable @typescript-eslint/no-explicit-any */
/** Set type guard */
export const isSet = <T extends Set<any>, U>(arg: T | U): arg is T => arg instanceof Set
export default isSet
