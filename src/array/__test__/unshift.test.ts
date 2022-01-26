import { unshift } from '../unshift'

test('unshift', () => {
  expect(unshift([1, 2, 3, 4, 5])).toStrictEqual([1, [2, 3, 4, 5]])
})
