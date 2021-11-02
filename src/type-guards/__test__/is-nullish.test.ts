import { isNullish } from '../is-nullish';

describe('isNullish', () => {
  test('works', () => {
    expect(isNullish({})).toBe(false);
    expect(isNullish(undefined)).toBe(true);
    expect(isNullish(null)).toBe(true);
  });
});
