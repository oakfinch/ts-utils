/* eslint-disable @typescript-eslint/no-explicit-any */
/** Map type guard */
export const isMap = <T extends Map<any, any>, U>(
  arg: T | U,
): arg is T => arg instanceof Map;

export default isMap;
