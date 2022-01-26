import type { AnyArray } from '@oakfinch/ts-extra'

export const unique = <T extends Readonly<AnyArray>>(arr: T): T[number][] => [...new Set<T>(arr)]

export default unique
