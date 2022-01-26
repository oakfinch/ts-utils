import { clone } from '../clone'

describe('clone', () => {
  test('handles primitives', () => {
    expect(clone(1)).toBe(1)
    expect(clone(undefined)).toBe(undefined)
    expect(clone('hello')).toBe('hello')
    expect(clone(true)).toBe(true)
    expect(clone(null)).toBe(null)
  })

  test('handles JSON serializable', () => {
    const obj = { foo: 'bar', foobar: ['foo', 'bar'] }
    expect(clone(obj)).toStrictEqual(obj)
    expect(clone(obj)).not.toBe(obj)
  })

  // turning this test off because Jest can't handle circular references
  // test('handles circular references', () => {
  //   const obj = { foo: 'bar', foobar: ['foo', 'bar', {}] };
  //   obj.foobar.push(obj);

  //   const cloned = clone(obj);
  //   expect(cloned).toStrictEqual(obj);
  //   expect(cloned).not.toBe(obj);
  // });

  // test('throws when cloning classes', () => {
  //   expect(() => clone(/some regex/)).toThrow();
  // });
})
