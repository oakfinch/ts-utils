import { isPromise } from '../is-promise'

describe('isPromise', () => {
  test('works', () => {
    expect(isPromise(Promise.resolve())).toBe(true)
    expect(isPromise({})).toBe(false)
    expect(isPromise(undefined)).toBe(false)
    expect(isPromise(5)).toBe(false)
    expect(isPromise(new Date())).toBe(false)
  })
})
