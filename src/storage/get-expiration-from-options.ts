import type { StorageOptions } from './types';

export const getExpirationFromOptions = ({ maxAge, expires }: StorageOptions): number =>
  Math.floor(
    (typeof maxAge === 'number' ? +new Date() + maxAge : null) ??
      (expires instanceof Date ? expires.getTime() : expires) ??
      NaN
  );

export default getExpirationFromOptions;
