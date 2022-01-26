import { isBoolean } from '../is-boolean'

describe('isBoolean', () => {
  test('works', () => {
    expect(isBoolean([])).toBe(false)
    expect(isBoolean(null)).toBe(false)
    expect(isBoolean(undefined)).toBe(false)
    expect(isBoolean('')).toBe(false)
    expect(isBoolean(0)).toBe(false)
    expect(isBoolean(NaN)).toBe(false)
    expect(isBoolean(true)).toBe(true)
    expect(isBoolean(false)).toBe(true)
  })
})
