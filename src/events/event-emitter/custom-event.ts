/* eslint-disable @typescript-eslint/no-explicit-any */
const Base =
  typeof CustomEvent !== 'undefined'
    ? CustomEvent
    : class<T = any> {
        /* eslint-disable class-methods-use-this, prettier/prettier, @typescript-eslint/lines-between-class-members */
        cancelBubble = false
        returnValue = false
        readonly bubbles: boolean = false
        readonly cancelable: boolean = true
        readonly composed: boolean = false
        readonly currentTarget = null
        readonly eventPhase = 0
        readonly isTrusted = false
        readonly srcElement = null
        readonly target = null
        readonly timeStamp = +new Date()
        readonly type: string
        readonly AT_TARGET = 0
        readonly BUBBLING_PHASE = 1
        readonly CAPTURING_PHASE = 2
        readonly NONE = -1
        readonly defaultPrevented: boolean
        initCustomEvent() {}
        composedPath() { return [] }
        initEvent() {}
        stopImmediatePropagation() {}
        stopPropagation() {}
        /* eslint-enable class-methods-use-this, prettier/prettier, @typescript-eslint/lines-between-class-members */

        readonly detail: T

        readonly preventDefault: () => void

        constructor(type: string, init?: CustomEventInit<T>) {
          this.type = type
          this.bubbles = init?.bubbles ?? false
          this.cancelable = init?.cancelable ?? true
          this.composed = init?.composed ?? false
          this.detail = init?.detail as T
          this.defaultPrevented = false

          let { defaultPrevented } = this as { defaultPrevented: boolean }
          this.preventDefault = () => {
            defaultPrevented = true
          }

          Object.defineProperty(this, 'defaultPrevented', {
            get() {
              return defaultPrevented
            },
          })
        }
      }

const event = Base
export { event as CustomEvent }
export default event
