import { isString } from '../is-string'

describe('isString', () => {
  test('works', () => {
    expect(isString({})).toBe(false)
    expect(isString([])).toBe(false)
    expect(isString('')).toBe(true)
  })
})
