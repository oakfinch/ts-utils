import { safe } from '../safe';

describe('safe', () => {
  test('prevents errors from being thrown', () => {
    const fn = () => {
      throw new Error('error');
    };
    expect(() => fn()).toThrow('error');
    expect(() => safe(fn)).not.toThrow('error');
  });

  test('returns correct value when no errors are thrown', () => {
    expect(safe(() => 'hello')).toEqual('hello');
  });
});
