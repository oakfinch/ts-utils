import type { AnyPromise } from '@oakfinch/ts-extra'
import { remove } from '../array/remove'
import { noop } from '../function/noop'

type Callback = <T extends AnyPromise, U extends AnyPromise[]>(promise: T, pending: U) => void

interface PromiseObserver {
  observe: <T extends AnyPromise>(promise: T) => T
  unobserve: <T extends AnyPromise>(promise: T) => T | undefined
}

export const makePromiseObserver = ({
  onStart = noop,
  onEnd = noop,
  onBeforeAdd = noop,
  onAdded = noop,
  onBeforeRemove = noop,
  onRemoved = noop,
}: {
  onStart?: Callback
  onEnd?: Callback
  onBeforeAdd?: Callback
  onAdded?: Callback
  onBeforeRemove?: Callback
  onRemoved?: Callback
}): PromiseObserver => {
  const pending: AnyPromise[] = []

  return {
    unobserve: promise => {
      if (pending.includes(promise)) {
        remove(promise, pending)
        if (pending.length === 0) {
          onEnd(promise, pending)
        }
        return promise
      }
      return undefined
    },
    observe: promise => {
      if (pending.length === 0) {
        onStart(promise, pending)
      }

      onBeforeAdd(promise, pending)
      pending.push(promise)
      onAdded(promise, pending)

      promise.finally(() => {
        if (pending.includes(promise)) {
          onBeforeRemove(promise, pending)
          remove(promise, pending)
          onRemoved(promise, pending)

          if (pending.length === 0) {
            onEnd(promise, pending)
          }
        }
      })

      return promise
    },
  } as PromiseObserver
}

export default makePromiseObserver
