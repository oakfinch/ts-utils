/** Number type guard */
export const isNumber = <T>(arg: T | number): arg is number => typeof arg === 'number';

export default isNumber;
