type FiniteOrNull<T extends number> =
  Exclude<number, T> extends never
    ? T | null
    : T;

/** Return `null` if `num` is Infinity, -Infinity, or NaN */
export const finiteOrNull = <T extends number>(
  num: T,
): FiniteOrNull<T> => (
    Number.isFinite(num)
      ? num
      : null
  ) as FiniteOrNull<T>;

export default finiteOrNull;
