import { getGlobal } from '../../../env/get-global'
import { makeLocalStorage } from '../local-storage/make-local-storage'
import { serialize as srz, deserialize as dsrz } from '../../../object/serialize'

export const makeSessionStorage = ({
  storage = getGlobal().localStorage,
  serialize,
  deserialize,
}: {
  storage?: Window['localStorage']
  serialize?: typeof srz
  deserialize?: typeof dsrz
} = {}) => makeLocalStorage({ storage, serialize, deserialize })

export default makeSessionStorage
