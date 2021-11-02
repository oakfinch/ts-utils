import { last } from '../last';

test('last', () => {
  expect(last([1, 2, 3, 4, 5])).toBe(5);
});
