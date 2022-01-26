import { compose, pipe } from '../compose'

describe('compose', () => {
  test('composes functions together', () => {
    const double = jest.fn((x: number) => x * 2)
    const addTwo = jest.fn((x: number) => x + 2)
    const square = jest.fn((x: number) => x ** 2)
    const fn = compose(double, addTwo, square)
    expect(fn(3)).toBe(22)
    expect(square).toHaveBeenCalledWith(3)
    expect(addTwo).toHaveBeenCalledWith(9)
    expect(double).toHaveBeenCalledWith(11)
  })

  test('throws when no functions are passed in', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(() => compose()).toThrow()
  })
})

describe('pipe', () => {
  test('pipes functions together', () => {
    const double = jest.fn((x: number) => x * 2)
    const addTwo = jest.fn((x: number) => x + 2)
    const square = jest.fn((x: number) => x ** 2)
    const fn = pipe(double, addTwo, square)
    expect(fn(3)).toBe(64)
    expect(double).toHaveBeenCalledWith(3)
    expect(addTwo).toHaveBeenCalledWith(6)
    expect(square).toHaveBeenCalledWith(8)
  })

  test('throws when no functions are passed in', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(() => pipe()).toThrow()
  })

  test('returns function unchanged if only one is passed in', () => {
    const double = jest.fn((x: number) => x * 2)
    const piped = pipe(double)
    expect(double).toBe(piped)
  })
})
