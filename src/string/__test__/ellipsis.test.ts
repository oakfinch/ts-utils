import { ellipsis } from '../ellipsis';

describe('ellipsis', () => {
  test('works', () => {
    expect(ellipsis('hello world', 100)).toBe('hello world');
    expect(ellipsis('hello world', 6)).toBe('hello…');
    expect(ellipsis('hello world', 6, '...')).toBe('hel...');
  });
});
