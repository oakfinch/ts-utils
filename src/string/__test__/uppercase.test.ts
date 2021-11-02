import { uppercase } from '../uppercase';

describe('uppercase', () => {
  test('works', () => {
    expect(uppercase('Hello World')).toBe('HELLO WORLD');
  });
});
