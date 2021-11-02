import * as index from '..';

test('index', () => {
  expect(index).toHaveProperty('promisify');
  expect(index).toHaveProperty('safe');
  expect(index).toHaveProperty('to');
});
