/* eslint-disable @typescript-eslint/no-unsafe-return */
import { makeLocalStorage } from '../local-storage/make-local-storage'
import { serialize as srz, deserialize as dsrz } from '../../../object/serialize'

const makeMemoryStorageAdapter = (): Storage => {
  const store = new Map()
  return {
    getItem: key => store.get(key),
    setItem: (key, val) => store.set(key, val),
    removeItem: key => store.delete(key),
    clear: () => store.clear(),
    key: i => [...store.keys()][i],
    get length() {
      return store.size
    },
  } as Storage
}

export const makeMemoryStorage = () =>
  makeLocalStorage({
    storage: makeMemoryStorageAdapter(),
    serialize: (x => x) as typeof srz,
    deserialize: (x => x) as typeof dsrz,
  })

export default makeMemoryStorage
