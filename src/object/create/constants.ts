export const PUBLIC_CONFIG = {
  enumerable: true,
  configurable: true,
  writeable: true,
} as const

export const PRIVATE_CONFIG = {
  enumerable: false,
  configurable: false,
  writeable: false,
} as const
