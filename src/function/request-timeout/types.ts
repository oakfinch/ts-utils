import type { Tuple } from '@oakfinch/ts-extra';
import type { IDLE, ANIMATION_FRAME } from './constants';

type Callback = {
  [IDLE]: (deadline: IdleDeadline) => void;
  [ANIMATION_FRAME]: (time: DOMHighResTimeStamp) => void;
  [key: number]: () => void;
};

type Timeout = {
  [U in keyof Callback]: (fn: Callback[U]) => number;
};

export type Idle = typeof IDLE;
export type AnimationFrame = typeof ANIMATION_FRAME;
export type TimeoutType = keyof Timeout;
export type TimeoutTypes = Tuple<TimeoutType>;
export type RequestCallback<T extends number | TimeoutType = typeof IDLE> = Callback[T];
export type RequestTimeout<T extends number | TimeoutType = typeof IDLE> = Timeout[T];
export type CancelTimeout = (id: number) => void;
