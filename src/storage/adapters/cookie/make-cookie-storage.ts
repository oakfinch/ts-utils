import type { AnyObject } from '@oakfinch/ts-extra';
import type { StorageAdapter } from '../../types';
import { getGlobal } from '../../../env/get-global';
import { memoize } from '../../../function/memoize';
import { entries } from '../../../object/entries';
import { serialize as srz, deserialize as dsrz } from '../../../object/serialize';
import {
  ATTRIBUTE_DELIMITER as DELIMITER,
  ATTRIBUTE_ASSIGNMENT_OPERATOR as EQUALS,
  ATTRIBUTE_NAME_MAP as ATTRIBUTES,
  LAX,
} from './constants';

export const makeCookieStorage = ({
  document = getGlobal().document,
  serialize = srz,
  deserialize = dsrz,
}: {
  document?: Pick<Document, 'cookie'>;
  serialize?: typeof srz;
  deserialize?: typeof dsrz;
} = {}) => {
  const parse = memoize((cookies: string) =>
    cookies.split(DELIMITER).reduce((acc, cookie) => {
      const [key, ...rest] = cookie.split(EQUALS);
      const value = rest.join(EQUALS).trim();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      return { ...acc, [key.trim()]: deserialize(value) ?? value };
    }, {} as Pick<AnyObject, string>)
  );

  const getAllCookies = () => parse(document.cookie);

  return {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    getItem: key => getAllCookies()[key] ?? null,
    setItem: (key, value, options = {}) => {
      // eslint-disable-next-line no-param-reassign
      document.cookie = entries({
        secure: true,
        sameSite: LAX,
        ...options,
        expires:
          typeof options.expires !== 'undefined'
            ? new Date(options.expires).toUTCString()
            : undefined,
      })
        .filter(([name, val]) => name in ATTRIBUTES && typeof val !== 'undefined')
        .reduce(
          (acc, [name, val]) =>
            val === true
              ? `${acc}${DELIMITER}${ATTRIBUTES[name]}`
              : `${acc}${DELIMITER}${ATTRIBUTES[name]}=${val as string}`,
          `${key}=${serialize(value) ?? ''}`
        );
    },
    removeItem(key) {
      this.setItem(key, '', { maxAge: -1 });
    },
    clear() {
      [...this.keys()].forEach(key => {
        this.removeItem(key);
      });
    },
    keys: () => Object.keys(parse(document.cookie)),
    entries: () => Object.entries(getAllCookies()),
    checkIsAvailable: () => typeof document.cookie === 'string',
  } as StorageAdapter;
};

export default makeCookieStorage;
