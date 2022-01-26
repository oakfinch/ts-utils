type Intersection<A, B> = Pick<A, Extract<keyof A, keyof B>> & Pick<B, Extract<keyof B, keyof A>>

/* eslint-disable no-restricted-globals */
export const getGlobal = (): {
  [P in keyof Intersection<Window, typeof globalThis>]: Intersection<Window, typeof globalThis>[P]
} => {
  if (typeof self !== 'undefined') {
    return self
  }
  if (typeof window !== 'undefined') {
    return window
  }
  if (typeof global !== 'undefined') {
    return global as Intersection<Window, typeof globalThis>
  }
  throw new Error('unable to locate global object')
}

export default getGlobal
