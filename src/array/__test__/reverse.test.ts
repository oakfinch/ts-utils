import { reverse } from '../reverse';

test('reverse', () => {
  expect(reverse([1, 2, 3, 4])).toStrictEqual([4, 3, 2, 1]);
});
