import { to } from '../to';

describe('to', () => {
  test('works when promise resolves', async () => {
    const [value] = await to(() => Promise.resolve('hello'));
    expect(value).toBe('hello');
  });

  test('works when promise rejects', async () => {
    const [value = 'some fallback', error] = await to(() => Promise.reject(Error('error')));
    expect(value).toBe('some fallback');
    expect(error).toEqual(Error('error'));
  });

  test('works with syncronous functions', () => {
    const fn = () => 'hello';
    const [value] = to(fn);
    expect(value).toBe('hello');
  });

  test('works when function throws error', () => {
    const fn: () => string = () => {
      throw Error('error');
    };
    const [value = 'some fallback', error] = to(fn);
    expect(value).toBe('some fallback');
    expect(error).toEqual(Error('error'));
  });

  test("returns argument if it's not a promise or a function", () => {
    const [value] = to('hello');
    expect(value).toBe('hello');
  });
});
