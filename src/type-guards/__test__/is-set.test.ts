import { isSet } from '../is-set';

describe('isSet', () => {
  test('works', () => {
    expect(isSet({})).toBe(false);
    expect(isSet([])).toBe(false);
    expect(isSet(new Set())).toBe(true);
  });
});
