import type { AnyFunction } from '@oakfinch/ts-extra'
import type { Callback, EventType, Options, Params } from './types'
import { ALL_EVENT_TYPE, ALL_EVENT_SYMBOL } from './constants'
import { normalizeArgs, isAllEvent, run, get } from './helpers'
import { CustomEvent } from './custom-event'

export class EventEmitter {
  private map: {
    param: Map<EventListenerObject | AnyFunction, EventListenerObject | AnyFunction>
    listener: Map<EventListenerObject | AnyFunction, EventListenerObject | AnyFunction>
  } = { listener: new Map(), param: new Map() }

  private listeners: Map<string, Set<EventListenerOrEventListenerObject>> = new Map()

  private onceListeners: Map<string, Set<EventListenerOrEventListenerObject>> = new Map()

  private get allListeners() {
    let acc = new Set<EventListenerOrEventListenerObject>()
    ;[this.listeners, this.onceListeners].forEach(map => {
      ;[...map.keys()].forEach(key => {
        acc = new Set([...acc, ...(map.get(key) ?? new Set())])
      })
    })
    return acc
  }

  dispatchEvent(event: Event): boolean {
    if (event.cancelable === true && event.defaultPrevented) {
      return false
    }

    if (!isAllEvent(event)) {
      this.dispatchEvent(new CustomEvent(ALL_EVENT_TYPE, { detail: event }))
    }

    this.listeners.get(event.type)?.forEach(listener => {
      run(listener, event)
    })

    this.onceListeners.get(event.type)?.forEach(listener => {
      run(listener, event)
      this.removeEventListener(event.type, listener)
    })

    return true
  }

  addEventListener(...args: Params): void {
    if (args[0] === ALL_EVENT_TYPE) {
      throw new Error(`invalid event name \`${ALL_EVENT_TYPE}\``)
    }

    const [type = ALL_EVENT_TYPE, listener, options] = normalizeArgs(args)

    if (listener) {
      if (options.signal) {
        options.signal.addEventListener('abort', () => {
          this.removeEventListener(type, listener, options)
        })
      }

      get({
        map: options.once ? this.onceListeners : this.listeners,
        key: type,
        default: new Set<EventListenerOrEventListenerObject>(),
      }).add(listener)
    }
  }

  removeEventListener(...args: Params): void {
    if (args[0] === ALL_EVENT_TYPE) {
      throw new Error(`invalid event name \`${ALL_EVENT_TYPE}\``)
    }

    const [type = ALL_EVENT_TYPE, listener] = normalizeArgs(args)

    if (listener) {
      this.onceListeners.get(type)?.delete(listener)
      this.listeners.get(type)?.delete(listener)
      if (!this.allListeners.has(listener)) {
        const param = this.map.listener.get(listener)
        this.map.listener.delete(listener)
        this.map.param.delete(param as AnyFunction)
      }
    }
  }

  removeAllListeners(
    name: string | string[] = [...new Set([...this.listeners.keys(), ...this.onceListeners.keys()])]
  ): void {
    if (Array.isArray(name)) {
      name.forEach(n => this.removeAllListeners(n))
      return
    }

    const listeners = new Set([
      ...(this.listeners.get(name) ?? []),
      ...(this.onceListeners.get(name) ?? []),
    ])

    listeners.forEach(listener => {
      this.removeEventListener(name, listener)
    })
  }

  emit<T>(type: string, data?: T) {
    this.dispatchEvent(new CustomEvent(type, { detail: data }))
  }

  on(callback: Callback<CustomEvent>, options?: Options): void
  on(type: string, callback: Callback, options?: Options): void
  on(
    ...args:
      | [callback: Callback, options?: Options]
      | [type: EventType, callback: Callback, options?: Options]
  ): void {
    const [type = ALL_EVENT_SYMBOL, callback, options] = normalizeArgs(
      args as [string, Callback, Options]
    )

    const listener: EventListenerOrEventListenerObject =
      this.map.param.get(callback) ??
      (((event: CustomEvent) => callback(event.detail)) as EventListener)

    this.map.param.set(callback, listener)
    this.map.listener.set(listener, callback)
    this.addEventListener(type, listener, options)
  }

  once(
    callback: Callback<CustomEvent>,
    options?: boolean | Omit<EventListenerOptions, 'once'>
  ): void
  once(
    type: string,
    callback: Callback,
    options?: boolean | Omit<EventListenerOptions, 'once'>
  ): void
  once(
    ...args:
      | [callback: Callback, options?: Options]
      | [type: EventType, callback: Callback, options?: Options]
  ): void {
    const [type, callback, options] = normalizeArgs(args as [string, Callback, Options])
    const opts = { ...options, once: true }
    return type ? this.on(type, callback, opts) : this.on(callback, opts)
  }

  off(types?: string | string[]): void
  off(callback: Callback<CustomEvent>, options?: Options): void
  off(type: string, callback: Callback, options?: Options): void
  off(
    ...args:
      | [types?: string | string[]]
      | [callback: Callback, options?: Options]
      | [type: EventType, callback: Callback, options?: Options]
  ): void {
    if (args.length === 0 || typeof args[0] === 'undefined') {
      this.removeAllListeners()
      return
    }

    if (args.length === 1 && (typeof args[0] === 'string' || Array.isArray(args[0]))) {
      this.removeAllListeners(args[0])
      return
    }

    const [type = ALL_EVENT_SYMBOL, callback, options] = normalizeArgs(
      args as [string, Callback, Options]
    )

    const listener = this.map.param.get(callback)
    if (listener) {
      this.removeEventListener(type, listener, options)
    }
  }
}

export const makeEventEmitter = () => new EventEmitter()
export const eventEmitter = makeEventEmitter()
export default eventEmitter
