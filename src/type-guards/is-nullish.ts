/* eslint-disable @typescript-eslint/no-explicit-any */
/** nullish (`null` or `undefined`) type-guard */
export const isNullish = <T extends any>(arg: T | null | undefined): arg is null | undefined =>
  arg !== true && (arg ?? true) === true;

export default isNullish;
