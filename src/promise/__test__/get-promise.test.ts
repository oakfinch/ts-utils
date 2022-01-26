/* eslint-disable @typescript-eslint/no-floating-promises */
import { getPromise } from '../get-promise'

describe('getPromise', () => {
  test('works', () => {
    const { promise: succeeds, resolve } = getPromise<string>()
    const { promise: fails, reject } = getPromise()
    setTimeout(() => {
      resolve('ok')
      reject('nope')
    }, 16)
    expect(succeeds).resolves.toBe('ok')
    expect(fails).rejects.toBe('nope')
  })
})
