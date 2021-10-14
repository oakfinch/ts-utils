export const isFunction = <T, U extends (...args: any[]) => any>(arg: T|U): arg is U => typeof arg === "function"

export default isFunction;
