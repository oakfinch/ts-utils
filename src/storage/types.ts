/* eslint-disable @typescript-eslint/no-explicit-any */
import type { SAME_SITE_VALUES } from './adapters/cookie/constants';

export interface StorageOptions {
  maxAge?: number;
  expires?: Date | number;
  path?: string;
  secure?: boolean;
  domain?: string;
  sameSite?: typeof SAME_SITE_VALUES[number] | Lowercase<typeof SAME_SITE_VALUES[number]>;
}

export interface StorageAdapter<TKey = string> {
  getItem: <T = any>(key: TKey) => T | null;
  setItem: (key: TKey, value: any, options?: StorageOptions) => void;
  removeItem: (key: TKey) => void;
  clear: () => void;
  keys: () => Iterable<TKey>;
  entries: <T = any>() => Iterable<[TKey, T]>;
  checkIsAvailable: () => boolean;
}
