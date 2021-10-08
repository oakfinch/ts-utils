export const quote = (
  str: string,
  lquo = '"',
  rquo = lquo,
): string => `${lquo}${str}${rquo}`;

export default quote;
