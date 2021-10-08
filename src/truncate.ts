export const truncate = (
  str: string,
  maxLength: number,
): string => str.slice(0, maxLength);

export default truncate;
