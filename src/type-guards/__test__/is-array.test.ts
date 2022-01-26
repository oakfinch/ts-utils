import { isArray } from '../is-array'

describe('isArray', () => {
  test('works', () => {
    expect(isArray([])).toBe(true)
    expect(isArray('hello')).toBe(false)
    expect(isArray({})).toBe(false)
  })
})
