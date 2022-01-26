import { uncapitalize } from '../uncapitalize'

describe('uncapitalize', () => {
  test('works', () => {
    expect(uncapitalize('Hello World')).toBe('hello World')
  })
})
