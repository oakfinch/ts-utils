import * as index from '..'

test('index', () => {
  expect(index).toHaveProperty('capitalize')
  expect(index).toHaveProperty('ellipsis')
  expect(index).toHaveProperty('lowercase')
  expect(index).toHaveProperty('quote')
  expect(index).toHaveProperty('replace')
  expect(index).toHaveProperty('template')
  expect(index).toHaveProperty('uncapitalize')
  expect(index).toHaveProperty('uppercase')
})
