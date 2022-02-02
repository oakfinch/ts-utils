import { isNull, isFunction, hasProperty } from '../../type-guards'
import { ALL_EVENT_SYMBOL, ALL_EVENT_TYPE } from './constants'
import { Options, Listener, Callback, EventType } from './types'

export const isListener = <T extends Listener, U>(obj: T | U): obj is T =>
  isNull(obj) || isFunction(obj) || hasProperty(obj, 'handleEvent')

export const isAllEvent = <T extends CustomEvent, U extends Event>(event: T | U): event is T =>
  event.type === ALL_EVENT_TYPE

export function normalizeArgs<T extends Listener | Callback>(
  args: [type: EventType, listener: T, options?: Options]
): [string | undefined, T, AddEventListenerOptions]
export function normalizeArgs<T extends Listener | Callback>(
  args: [listener: T, options?: Options]
): [string | undefined, T, AddEventListenerOptions]
export function normalizeArgs<T extends Listener | Callback>(
  args: [type: EventType, listener: T, options?: Options] | [listener: T, options?: Options]
): [string | undefined, T, AddEventListenerOptions] {
  const [type, listener, options] =
    isFunction(args[0]) || isListener(args[0])
      ? ([ALL_EVENT_SYMBOL, args[0], args[1]] as [EventType, T, Options])
      : (args as [EventType, T, Options])

  const opts: AddEventListenerOptions =
    options === true || options === false ? { capture: options as boolean } : options ?? {}

  return [type === ALL_EVENT_SYMBOL ? undefined : type, listener, opts]
}

export const run = (listener: EventListenerOrEventListenerObject, event: Event) => {
  if (hasProperty(listener, 'handleEvent')) {
    listener.handleEvent(event)
  } else {
    listener(event)
  }
}

export const get = <K, V, M extends Map<K, V>>({
  map,
  key,
  default: def,
}: {
  map: M
  key: K
  default: V
}) => {
  if (!map.has(key)) {
    map.set(key, def)
  }
  return map.get(key) as V
}
