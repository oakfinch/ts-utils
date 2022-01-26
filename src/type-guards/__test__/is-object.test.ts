import { isObject } from '../is-object'

describe('isObject', () => {
  test('works', () => {
    expect(isObject({})).toBe(true)
    expect(isObject(undefined)).toBe(false)
    expect(isObject(5)).toBe(false)
    expect(isObject(new Date())).toBe(false)
  })
})
