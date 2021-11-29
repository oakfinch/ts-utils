/** Promise type guard */
export const isPromise = <T, U extends Promise<T>>(obj: T | U): obj is U =>
  Promise.resolve(obj) === obj;

export default isPromise;
