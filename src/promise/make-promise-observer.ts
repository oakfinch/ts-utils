/* eslint-disable no-void */
import type { AnyPromise } from '@oakfinch/ts-extra'
import { noop } from '../function/noop'

type Callback = <T extends AnyPromise, U extends AnyPromise[]>(promise: T, pending: U) => void

interface PromiseObserver {
  observe: <T extends AnyPromise>(promise: T) => T
  unobserve: <T extends AnyPromise>(promise: T) => T | undefined
}

export const makePromiseObserver = ({
  onBeforeChange = noop,
  onChange = noop,
}: {
  onBeforeChange?: Callback
  onChange?: Callback
}): PromiseObserver => {
  const pending = new Set<AnyPromise>()

  const observer: PromiseObserver = {
    unobserve: promise => {
      if (pending.has(promise)) {
        onBeforeChange(promise, [...pending])
        pending.delete(promise)
        onChange(promise, [...pending])
        return promise
      }
      return undefined
    },
    observe: promise => {
      onBeforeChange(promise, [...pending])
      pending.add(promise)
      onChange(promise, [...pending])

      promise.then(
        () => {
          void observer.unobserve(promise)
        },
        () => {
          void observer.unobserve(promise)
        }
      )

      return promise
    },
  }

  return observer
}

export default makePromiseObserver
