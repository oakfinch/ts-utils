/* eslint-disable no-void */
import type { AnyPromise } from '@oakfinch/ts-extra'
import { remove } from '../array/remove'
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
  const pending: AnyPromise[] = []
  const removePromise = (promise: AnyPromise) => {
    if (pending.includes(promise)) {
      onBeforeChange(promise, pending)
      remove(promise, pending)
      onChange(promise, pending)
      return promise
    }
    return undefined
  }

  return {
    unobserve: promise => removePromise(promise),
    observe: promise => {
      onBeforeChange(promise, pending)
      pending.push(promise)
      onChange(promise, pending)

      void (async () => {
        try {
          await promise
        } catch {
          // do nothing
        }
        void removePromise(promise)
      })()

      return promise
    },
  } as PromiseObserver
}

export default makePromiseObserver
