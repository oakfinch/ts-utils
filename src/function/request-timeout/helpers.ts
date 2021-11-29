import getGlobal from 'globalthis/shim';
import { hasProperty } from '../../type-guards/has-property';
import { isNumber } from '../../type-guards/is-number';
import { IDLE, TYPE_MAP } from './constants';
import type { RequestTimeout, RequestCallback, CancelTimeout, TimeoutType } from './types';

export const fallback = (time: number): [RequestTimeout<number>, CancelTimeout] => [
  fn => Number(setTimeout(fn, time)),
  id => clearTimeout(id),
];

export const getTimeout = (
  type: number | TimeoutType,
  options?: IdleRequestOptions
): [RequestTimeout<typeof type>, CancelTimeout] => {
  if (isNumber(type)) {
    return fallback(type);
  }

  const gbl = getGlobal();
  if (TYPE_MAP[type].some(cb => !hasProperty(gbl, cb))) {
    return fallback(0);
  }

  const [request, cancel] = TYPE_MAP[type];
  const [requestIdle] = TYPE_MAP[IDLE];

  return [
    request === requestIdle && options
      ? (fn: RequestCallback<typeof IDLE>) => gbl[request](fn, options)
      : gbl[request],
    gbl[cancel],
  ];
};
