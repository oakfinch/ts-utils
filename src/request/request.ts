import { getGlobal } from '../env/get-global'
import { FetchError } from './FetchError'

const fetch: Window['fetch'] = async (...args: Parameters<Window['fetch']>) => {
  const win = getGlobal()
  if (typeof win === 'undefined' || !win.fetch) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await import('whatwg-fetch')
  }

  return win.fetch(...args)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const request = async <T = any>(url = '', options: RequestInit = {}): Promise<T> => {
  const resolved = await fetch(url, options)

  if (resolved.status >= 400 || resolved.status < 100) {
    throw new FetchError(resolved.status, await resolved.text())
  }

  const contentType = resolved.headers.get('content-type')

  if (contentType?.includes('json')) {
    return resolved.json() as Promise<T>
  }

  if (!contentType) {
    const body = await resolved.text()
    try {
      return JSON.parse(body) as T
    } catch {
      return body as unknown as T
    }
  }

  return (await resolved.text()) as unknown as T
}

export default request
