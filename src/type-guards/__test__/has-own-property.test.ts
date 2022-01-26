import { hasOwnProperty } from '../has-own-property'

describe('hasOwnProperty', () => {
  test('works', () => {
    const obj = { foo: 'bar' }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const obj2 = Object.create(obj)
    expect(hasOwnProperty(obj, 'foo')).toBe(true)
    expect(hasOwnProperty(obj, 'bar')).toBe(false)
    expect(hasOwnProperty(obj2, 'foo')).toBe(false)
  })
})
