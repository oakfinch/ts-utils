/* eslint-disable @typescript-eslint/no-explicit-any */
export const isPromise = <T, U extends Promise<any>>(
  obj: T | U,
): obj is U => Promise.resolve(obj) === obj;

export default isPromise;
