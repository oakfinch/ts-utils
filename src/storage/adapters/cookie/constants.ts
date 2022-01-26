import type { StorageOptions } from '../../types'

export const ATTRIBUTE_DELIMITER = ';'
export const ATTRIBUTE_ASSIGNMENT_OPERATOR = '='
export const MAX_AGE = 'Max-Age'
export const EXPIRES = 'Expires'
export const SECURE = 'Secure'
export const DOMAIN = 'Domain'
export const PATH = 'Path'
export const SAME_SITE = 'SameSite'

export const ATTRIBUTE_NAME_MAP: {
  [P in keyof Required<StorageOptions>]: string
} = {
  maxAge: MAX_AGE,
  expires: EXPIRES,
  sameSite: SAME_SITE,
  secure: SECURE,
  domain: DOMAIN,
  path: PATH,
}

export const NONE = 'None'
export const STRICT = 'Strict'
export const LAX = 'Lax'

export const SAME_SITE_VALUES = [NONE, STRICT, LAX] as const
