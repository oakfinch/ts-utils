import type { Value } from '@oakfinch/ts-extra'
import { STORAGE_TYPES } from './constants'
import { cookieStorage, localStorage, sessionStorage, memoryStorage } from './adapters'

const storageMap = {
  [STORAGE_TYPES.COOKIE]: cookieStorage,
  [STORAGE_TYPES.LOCAL_STORAGE]: localStorage,
  [STORAGE_TYPES.SESSION_STORAGE]: sessionStorage,
  [STORAGE_TYPES.MEMORY]: memoryStorage,
} as const

const defaultStack = [
  STORAGE_TYPES.SESSION_STORAGE,
  STORAGE_TYPES.LOCAL_STORAGE,
  STORAGE_TYPES.COOKIE,
  STORAGE_TYPES.MEMORY,
]

export const getStorage = (...types: Value<typeof STORAGE_TYPES>[]) =>
  (types ?? defaultStack)
    .map(type => [type, storageMap[type]] as const)
    .find(([, adapter]) => adapter.checkIsAvailable())?.[1]

export default getStorage
