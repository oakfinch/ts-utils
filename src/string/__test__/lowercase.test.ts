import { lowercase } from '../lowercase';

describe('lowercase', () => {
  test('works', () => {
    expect(lowercase('HELLO WORLD')).toBe('hello world');
  });
});
