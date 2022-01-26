import { pop } from '../pop'

test('pop', () => {
  expect(pop([1, 2, 3, 4, 5])).toStrictEqual([5, [1, 2, 3, 4]])
})
