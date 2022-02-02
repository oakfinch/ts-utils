/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ALL_EVENT_SYMBOL } from './constants'

export type Callback<T = never> = [T] extends [never]
  ? (data: any) => void
  : <U extends T>(data: U) => void
export type Listener = Parameters<EventTarget['addEventListener']>[1]
export type Options = Parameters<EventTarget['addEventListener']>[2]
export type EventType = string | typeof ALL_EVENT_SYMBOL
export type Params = [type: EventType, listener: Listener, options?: Options]
