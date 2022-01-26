/* eslint-disable @typescript-eslint/no-unsafe-return */
import { getGlobal } from '../../../env/get-global';
import type { StorageAdapter } from '../../types';
import { EXPIRATION_PREFIX as EXP } from './constants';
import { getExpirationFromOptions } from '../../get-expiration-from-options';
import { serialize as srz, deserialize as dsrz } from '../../../object/serialize';

const now = () => +new Date();

export const makeLocalStorage = ({
  storage = getGlobal().localStorage,
  serialize = srz,
  deserialize = dsrz,
}: {
  storage?: Window['localStorage'];
  serialize?: typeof srz;
  deserialize?: typeof dsrz;
} = {}) => {
  const getExpKey = (key: string) => `${EXP}${key}`;

  const getExpTimestamp = (key: string) => {
    const exp = storage.getItem(getExpKey(key)) ?? 'NaN';
    const timestamp = parseInt(exp, 10);
    return `${timestamp}` === exp ? timestamp : NaN;
  };

  const removeIfExpired = (key: string, timestamp?: number) => {
    const isExpired = (timestamp ?? getExpTimestamp(key)) < now();
    if (isExpired) {
      storage.removeItem(key);
      storage.removeItem(getExpKey(key));
    }
    return isExpired;
  };

  const getItem = (key: string, checkIsExpired = true) => {
    if (checkIsExpired) {
      removeIfExpired(key);
    }
    return deserialize(storage.getItem(key) ?? 'null');
  };

  const getAllKeys = () => {
    const keys: string[] = [];
    for (let i = 0; i < storage.length; i += 1) {
      const key = storage.key(i);
      if (key !== null && !key.startsWith(EXP)) {
        keys.push(key);
      }
    }
    return keys;
  };

  const removeAllExpired = () =>
    getAllKeys().reduce((acc, key) => (removeIfExpired(key) ? acc : [...acc, key]), [] as string[]);

  return {
    getItem: key => getItem(key),
    setItem: (key, value, options = {}) => {
      const expiration = getExpirationFromOptions(options);
      const isExpired = removeIfExpired(key, expiration);
      if (!isExpired) {
        storage.setItem(key, serialize(value) ?? 'null');
      }
      if (!Number.isNaN(expiration)) {
        storage.setItem(getExpKey(key), serialize(expiration) ?? 'null');
      }
    },
    removeItem: key => {
      storage.removeItem(key);
      storage.removeItem(getExpKey(key));
    },
    clear() {
      [...this.keys()].forEach(key => {
        this.removeItem(key);
      });
    },
    keys: () => removeAllExpired(),
    entries() {
      return [...this.keys()].map(key => [key, getItem(key, false)]);
    },
    checkIsAvailable: () => typeof storage !== 'undefined',
  } as StorageAdapter;
};

export default makeLocalStorage;

// export const makeLocalStorage = ({
//   serialize: srz = serialize,
//   deserialize: dsz = deserialize,
//   storage: store = getGlobal().localStorage
// } = {}) => factory({ serialize: srz, deserialize: dsz, storage: store })
