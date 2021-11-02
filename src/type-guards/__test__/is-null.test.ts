import { isNull } from '../is-null';

describe('isNull', () => {
  test('works', () => {
    expect(isNull({})).toBe(false);
    expect(isNull(undefined)).toBe(false);
    expect(isNull(null)).toBe(true);
  });
});
