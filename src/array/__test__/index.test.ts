import * as index from '..'

test('index', () => {
  expect(index).toHaveProperty('last')
  expect(index).toHaveProperty('pop')
  expect(index).toHaveProperty('push')
  expect(index).toHaveProperty('shift')
  expect(index).toHaveProperty('unshift')
})
