import { quote } from '../quote'

describe('quote', () => {
  test('works', () => {
    expect(quote('hello world')).toBe('"hello world"')
    expect(quote('hello world', '#')).toBe('#hello world#')
    expect(quote('hello world', '<', '>')).toBe('<hello world>')
  })
})
