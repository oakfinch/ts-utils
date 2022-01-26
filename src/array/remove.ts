import type { AnyArray } from '@oakfinch/ts-extra'

export const remove = <T extends AnyArray>(item: T[number], arr: T): T => {
  const index = arr.indexOf(item)
  if (index >= 0) {
    arr.splice(index, 1)
  }
  return arr
}

export default remove
