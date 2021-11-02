import { push } from '../push';

test('push', () => {
  expect(push([1, 2, 3, 4], 5)).toStrictEqual([1, 2, 3, 4, 5]);
});
