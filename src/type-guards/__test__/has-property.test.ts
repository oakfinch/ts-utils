import { hasProperty } from '../has-property';

describe('hasProperty', () => {
  test('works', () => {
    const obj = { foo: 'bar' };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const obj2 = Object.create(obj);
    expect(hasProperty(obj, 'foo')).toBe(true);
    expect(hasProperty(obj, 'bar')).toBe(false);
    expect(hasProperty(obj2, 'foo')).toBe(true);
  });
});
