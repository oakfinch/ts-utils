export const serialize = <T>(obj: T): string | null => {
  try {
    return JSON.stringify(obj)
  } catch {
    return null
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const deserialize = <T = any>(str: string): T | null => {
  try {
    return JSON.parse(str) as T
  } catch {
    return null
  }
}
