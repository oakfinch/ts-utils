/**
 * Returns `num` as-is, unless `num` is Infinity, -Infinity, or NaN,
 * in which case it returns `null`
 */
export const finiteOrNull = <T extends number>(
  num: T
): Exclude<number, T> extends never ? T | null : T =>
  (Number.isFinite(num) ? num : null) as Exclude<number, T> extends never ? T | null : T;

export default finiteOrNull;
