import { partial } from '../partial'

describe('partial', () => {
  test('works', () => {
    const addThenDouble = (x: number, y: number) => (x + y) * 2
    const addOneThenDouble = partial(addThenDouble, 1)
    const addTwoThenDouble = partial(addThenDouble, 2)
    expect(addOneThenDouble(2)).toEqual(addThenDouble(1, 2))
    expect(addTwoThenDouble(2)).toEqual(addThenDouble(2, 2))
  })

  test('returns function unchanged if no arguments are passed in', () => {
    const fn = (x: number, y: number) => (x + y) * 2
    expect(partial(fn)).toBe(fn)
  })
})
