export class FetchError extends Error {
  status: number

  constructor(status: number, body = '') {
    super(body)
    this.status = status
  }
}

export default FetchError
