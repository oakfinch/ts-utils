import { isFunction } from '../is-function'

describe('isFunction', () => {
  test('works', () => {
    expect(isFunction([])).toBe(false)
    expect(isFunction(null)).toBe(false)
    expect(isFunction(undefined)).toBe(false)
    expect(isFunction('')).toBe(false)
    expect(isFunction(0)).toBe(false)
    expect(isFunction(NaN)).toBe(false)
    expect(isFunction(() => {})).toBe(true)
    expect(isFunction(Date)).toBe(true)
  })
})
