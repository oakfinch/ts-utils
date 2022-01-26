/**
 * @jest-environment jsdom
 */
/* eslint-disable no-void */
import { requestTimeout } from '..'

describe('requestTimeout', () => {
  const mocks: { [k: string]: jest.SpyInstance } = {}
  const noop = () => {}

  beforeAll(() => {
    jest.useFakeTimers()
  })

  beforeEach(() => {
    mocks.setTimeout = jest.spyOn(global, 'setTimeout')
    mocks.clearTimeout = jest.spyOn(global, 'clearTimeout')
    mocks.requestAnimationFrame = jest.spyOn(global, 'requestAnimationFrame')
    mocks.cancelAnimationFrame = jest.spyOn(global, 'cancelAnimationFrame')

    if ('requestIdleCallback' in global) {
      mocks.requestIdleCallback = jest.spyOn(global, 'requestIdleCallback')
    } else {
      global.requestIdleCallback = noop as unknown as typeof global.requestIdleCallback
      mocks.requestIdleCallback = jest
        .spyOn(global, 'requestIdleCallback')
        .mockImplementation(
          cb =>
            setTimeout(
              () => cb({ didTimeout: false, timeRemaining: () => 1 }),
              0
            ) as unknown as number
        )
    }

    if ('cancelIdleCallback' in global) {
      mocks.cancelIdleCallback = jest.spyOn(global, 'cancelIdleCallback')
    } else {
      global.cancelIdleCallback = noop as unknown as typeof global.cancelIdleCallback
      mocks.cancelIdleCallback = jest
        .spyOn(global, 'cancelIdleCallback')
        .mockImplementation((id: number) => clearTimeout(id))
    }

    jest.clearAllTimers()

    Object.keys(mocks).forEach(name => {
      mocks[name].mockClear()
    })
  })

  afterAll(() => {
    Object.keys(mocks).forEach(name => {
      mocks[name].mockRestore()
    })

    /* eslint-disable @typescript-eslint/ban-ts-comment */
    // @ts-ignore
    if (global.requestIdleCallback === noop) {
      // @ts-ignore
      delete global.requestIdleCallback
    }
    if (global.cancelIdleCallback === noop) {
      // @ts-ignore
      delete global.cancelIdleCallback
    }
    /* eslint-enable @typescript-eslint/ban-ts-comment */

    jest.useRealTimers()
  })

  test('queues a function to be called later', async () => {
    const cb = jest.fn(() => true)
    const promise = requestTimeout(cb)
    expect(cb).toBeCalledTimes(0)

    jest.runAllTimers()
    await promise

    expect(cb).toBeCalledTimes(1)
  })

  test('defaults to requestIdleCallback', () => {
    const cb = jest.fn(() => true)
    void requestTimeout(cb)
    expect(global.requestIdleCallback).toBeCalledTimes(1)
  })

  test('uses `idle` type when passed an options object', () => {
    const cb = jest.fn(() => true)
    const options = { timeout: 0 }
    void requestTimeout(cb, options)
    expect(global.requestIdleCallback).toBeCalledTimes(1)
    expect(global.requestIdleCallback).toBeCalledWith(expect.anything(), options)
  })

  test('works with `idle` type', async () => {
    const cb = jest.fn(() => true)
    const promise = requestTimeout(cb, 'idle')
    expect(cb).toBeCalledTimes(0)

    jest.runAllTimers()
    await promise

    expect(cb).toBeCalledTimes(1)
    expect(global.requestIdleCallback).toBeCalledTimes(1)
  })

  test('can be canceled when using `idle` type', () => {
    const cb = jest.fn(() => true)
    const { cancel } = requestTimeout(cb, 'idle')
    expect(cb).toBeCalledTimes(0)

    cancel()
    jest.runAllTimers()

    expect(global.setTimeout).toBeCalledTimes(1)
    expect(cb).toBeCalledTimes(0)
  })

  test('works with `animationFrame` type', async () => {
    const cb = jest.fn(() => true)
    const promise = requestTimeout(cb, 'animationFrame')
    expect(cb).toBeCalledTimes(0)

    jest.runAllTimers()
    await promise

    expect(cb).toBeCalledTimes(1)
    expect(global.requestAnimationFrame).toBeCalledTimes(1)
  })

  test('can be canceled when using `animationFrame` type', () => {
    const cb = jest.fn(() => true)
    const { cancel } = requestTimeout(cb, 'animationFrame')
    expect(cb).toBeCalledTimes(0)

    cancel()
    jest.runAllTimers()

    expect(global.requestAnimationFrame).toBeCalledTimes(1)
    expect(cb).toBeCalledTimes(0)
  })

  test('works with numbers', async () => {
    const cb = jest.fn(() => true)
    const promise = requestTimeout(cb, 100)
    expect(cb).toBeCalledTimes(0)

    jest.runAllTimers()
    await promise

    expect(cb).toBeCalledTimes(1)
    expect(global.setTimeout).toBeCalledTimes(1)
  })

  test('can be canceled when using numbers', () => {
    const cb = jest.fn(() => true)
    const { cancel } = requestTimeout(cb, 100)
    expect(cb).toBeCalledTimes(0)

    cancel()
    jest.runAllTimers()

    expect(global.setTimeout).toBeCalledTimes(1)
    expect(cb).toBeCalledTimes(0)
  })

  test('promise rejects if callback throws an error', async () => {
    expect.assertions(1)
    const error = new Error('error')
    const cb = jest.fn(() => {
      throw error
    })
    const promise = requestTimeout(cb, 100)
    jest.runAllTimers()

    try {
      await promise
    } catch (err) {
      expect(err).toBe(error)
    }
  })

  test('canceled callbacks can throw errors', async () => {
    expect.assertions(1)

    const cb = jest.fn(() => true)
    const error = new Error('canceled')
    const promise = requestTimeout(cb, 100)

    promise.cancel({ error })
    jest.runAllTimers()
    try {
      await promise
    } catch (err) {
      expect(err).toBe(error)
    }
  })

  test('falls-back to setTimeout(fn, 0)', async () => {
    const original = global.requestIdleCallback

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    delete global.requestIdleCallback

    const cb = jest.fn(() => true)
    const promise = requestTimeout(cb, 'idle')
    expect(cb).toBeCalledTimes(0)

    jest.runAllTimers()
    await promise

    expect(cb).toBeCalledTimes(1)
    expect(global.setTimeout).toBeCalledTimes(1)
    expect(global.setTimeout).toBeCalledWith(expect.anything(), 0)
    global.requestIdleCallback = original
  })
})
