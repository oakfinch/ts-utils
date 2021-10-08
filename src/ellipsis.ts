import { truncate } from './truncate';

/**
 * Truncates a string and adds an ellipsis onto the end
 */
export const ellipsis = (
  str: string,
  maxLength: number,
  ellipsisString = '…',
): string => (str.length <= maxLength
  ? str
  : truncate(str, maxLength - ellipsisString.length) + ellipsisString);

export default ellipsis;
