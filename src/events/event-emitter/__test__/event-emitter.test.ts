import { CustomEvent } from '../custom-event'
import type { EventEmitter } from '../event-emitter'
import { makeEventEmitter } from '../event-emitter'

describe('event-emitter', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  const waitForEvent = (emitter: EventEmitter, type: string, timeout = 50) =>
    new Promise((resolve, reject) => {
      emitter.on(type, val => resolve(val))
      setTimeout(() => reject(new Error('timeout')), timeout)
    })

  test('emits events', async () => {
    const eventEmitter = makeEventEmitter()
    const promise = waitForEvent(eventEmitter, 'test')
    eventEmitter.emit('test', 'hello')
    jest.advanceTimersByTime(10)
    await expect(promise).resolves.toBe('hello')
  })

  test('doesnt emit if not called', async () => {
    const eventEmitter = makeEventEmitter()
    const promise = waitForEvent(eventEmitter, 'test')
    jest.advanceTimersByTime(1000)
    await expect(promise).rejects.toThrowError('timeout')
  })

  test('listeners work more than once', async () => {
    const eventEmitter = makeEventEmitter()
    const promise = new Promise((resolve, reject) => {
      const tmp: number[] = []
      eventEmitter.on('test', (val: number) => {
        tmp.push(val)
        if (tmp.length === 5) {
          resolve(tmp)
        }
      })
      setTimeout(() => reject(new Error('timeout')), 1000)
    })

    eventEmitter.emit('test', 1)
    eventEmitter.emit('test', 2)
    eventEmitter.emit('test', 3)
    eventEmitter.emit('test', 4)
    eventEmitter.emit('test', 5)

    jest.advanceTimersByTime(2000)
    await expect(promise).resolves.toEqual([1, 2, 3, 4, 5])
  })

  test('listeners added with `once` are only called once', () => {
    const eventEmitter = makeEventEmitter()
    const tmp: number[] = []
    eventEmitter.once('test', (val: number) => tmp.push(val))
    eventEmitter.emit('test', 1)
    eventEmitter.emit('test', 2)
    eventEmitter.emit('test', 3)
    eventEmitter.emit('test', 4)
    eventEmitter.emit('test', 5)
    expect(tmp).toEqual([1])
  })

  test('global listeners work', () => {
    const eventEmitter = makeEventEmitter()
    const data: [string, number][] = []
    const str = 'hello world this is a test'
    eventEmitter.on((event: CustomEvent<number>) => data.push([event.type, event.detail]))

    str.split(' ').forEach((word, index) => {
      eventEmitter.emit(word, index)
    })

    expect(data).toEqual(str.split(' ').map((word, index) => [word, index]))
  })

  test('listeners can be removed', () => {
    const eventEmitter = makeEventEmitter()
    const data: string[] = []
    const str = 'hello world this is a test'
    const listener = (word: string) => {
      data.push(word)
    }
    eventEmitter.on('test', listener)

    str.split(' ').forEach(word => eventEmitter.emit('test', word))

    eventEmitter.off('test', listener)

    str.split(' ').forEach(word => eventEmitter.emit('test', word))

    expect(data).toEqual(str.split(' '))
  })

  test('global listeners can be removed', () => {
    const eventEmitter = makeEventEmitter()
    const data: [string, number][] = []
    const str = 'hello world this is a test'
    const listener = (event: CustomEvent<number>) => data.push([event.type, event.detail])
    eventEmitter.on(listener)

    str.split(' ').forEach((word, index) => eventEmitter.emit(word, index))

    eventEmitter.off(listener)

    str.split(' ').forEach((word, index) => eventEmitter.emit(word, index))

    expect(data).toEqual(str.split(' ').map((word, index) => [word, index]))
  })

  test("doesn't run for canceled events", () => {
    const eventEmitter = makeEventEmitter()
    const listener = jest.fn(() => {})
    const event = new CustomEvent('test')

    eventEmitter.on(listener)
    event.preventDefault()
    eventEmitter.dispatchEvent(event)

    expect(listener).not.toBeCalled()
  })
})
