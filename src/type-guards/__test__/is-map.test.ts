import { isMap } from '../is-map';

describe('isMap', () => {
  test('works', () => {
    expect(isMap({})).toBe(false);
    expect(isMap(new Map())).toBe(true);
  });
});
