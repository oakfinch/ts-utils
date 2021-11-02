import { isPrimitive } from '../is-primitive';

describe('isPrimitive', () => {
  test('works', () => {
    expect(isPrimitive([])).toBe(false);
    expect(isPrimitive({})).toBe(false);
    expect(isPrimitive(new Date())).toBe(false);
    expect(isPrimitive('')).toBe(true);
    expect(isPrimitive(5)).toBe(true);
    expect(isPrimitive(false)).toBe(true);
    expect(isPrimitive(undefined)).toBe(true);
    expect(isPrimitive(null)).toBe(true);
  });
});
