import { shift } from '../shift';

test('shift', () => {
  expect(shift([1, 2, 3, 4], 5)).toStrictEqual([5, 1, 2, 3, 4]);
});
