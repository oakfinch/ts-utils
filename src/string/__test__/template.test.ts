import { template } from '../template'

describe('template', () => {
  test('works', () => {
    const greet = template`${'greeting'}, how are you today ${'name'}?`
    expect(greet({ greeting: 'Hello', name: 'Robert' })).toBe('Hello, how are you today Robert?')
    expect(greet({ greeting: 'Hey', name: 'Bob' })).toBe('Hey, how are you today Bob?')
  })
})
