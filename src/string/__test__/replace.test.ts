import { replace } from '../replace';

describe('replace', () => {
  test('works', () => {
    expect(replace('hello world', 'world', 'hello')).toBe('hello hello');
    expect(replace('hello world', { hello: 'hey', world: 'you' })).toBe('hey you');
  });
});
