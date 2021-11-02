import { promisify } from '../promisify';

describe('promisify', () => {
  test('works with single result callback', async () => {
    const arg = 5;
    const fn = (val: number, cb: (err: null, result: number) => void) => cb(null, val);
    const pfn = promisify(fn);
    const resolved = await pfn(5);
    fn(arg, (err, result) => {
      expect(resolved).toEqual(result);
    });
  });

  test('rejects when first callback arg is not null', () => {
    const fn = (val: number, cb: (err: string, result: null) => void) => cb('error', null);
    const pfn = promisify(fn);
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    expect(pfn(5)).rejects.toEqual('error');
  });

  test('handles multiple callback arguments', async () => {
    const fn = (val: string, cb: (err: null, a: string, b: string) => void) =>
      cb(null, val, val.toUpperCase());
    const pfn = promisify(fn, ['a', 'b']);
    const resolved = await pfn('hello');
    expect(resolved).toEqual({ a: 'hello', b: 'HELLO' });
  });

  test('handles multiple no arguments', async () => {
    const fn = (val: string, cb: (err: null) => void) => cb(null);
    const pfn = promisify(fn);
    const resolved = await pfn('hello');
    expect(resolved).toEqual(undefined);
  });
});
