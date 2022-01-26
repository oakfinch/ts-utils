/* eslint-disable no-restricted-globals */
export const getGlobal = (): Window => {
  if (typeof self !== 'undefined') {
    return self
  }
  if (typeof window !== 'undefined') {
    return window
  }
  if (typeof global !== 'undefined') {
    return global as unknown as Window
  }
  throw new Error('unable to locate global object')
}

export default getGlobal
