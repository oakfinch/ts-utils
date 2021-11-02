import { isNumber } from '../is-number';

describe('isNumber', () => {
  test('works', () => {
    expect(isNumber({})).toBe(false);
    expect(isNumber(undefined)).toBe(false);
    expect(isNumber(5)).toBe(true);
  });
});
