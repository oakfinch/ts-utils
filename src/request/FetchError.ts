export class FetchError extends Error {
  constructor(status: number, body = '') {
    super(`HTTP Error: ${status}${body ? `\n${body}` : body}`)
  }
}

export default FetchError
