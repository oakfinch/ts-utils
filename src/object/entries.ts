import type { AnyObject, Value, Entries, FromEntries, Mutable } from '@oakfinch/ts-extra';

export const entries = <T extends AnyObject>(obj: T) =>
  Object.entries(obj) as NonNullable<Value<{ [P in keyof T]: [P, T[P]] }>>[];

export const fromEntries = <T extends Readonly<Entries<AnyObject>>>(
  items: T
): FromEntries<Mutable<T>> =>
  items.reduce(
    (acc, [key, val]) => ({ ...acc, [key]: val as T[number][1] }),
    {} as FromEntries<Mutable<T>>
  );
