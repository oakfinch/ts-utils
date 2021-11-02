import { capitalize } from '../capitalize';

describe('capitalize', () => {
  test('works', () => {
    expect(capitalize('hello world')).toBe('Hello world');
  });
});
