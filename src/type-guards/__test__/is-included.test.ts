import { isIncluded } from '../is-included'

describe('isIncluded', () => {
  test('works', () => {
    expect(isIncluded('hi', ['nope'])).toBe(false)
    expect(isIncluded('hi', [])).toBe(false)
    expect(isIncluded('hi', ['HI', 'HI', 'HI'])).toBe(false)
    expect(isIncluded('hi', ['hi', 'HI', 'HI'])).toBe(true)
  })
})
