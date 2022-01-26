import * as index from '..'

test('index', () => {
  expect(index).toHaveProperty('hasOwnProperty')
  expect(index).toHaveProperty('hasProperty')
  expect(index).toHaveProperty('isArray')
  expect(index).toHaveProperty('isBoolean')
  expect(index).toHaveProperty('isFunction')
  expect(index).toHaveProperty('isIncluded')
  expect(index).toHaveProperty('isMap')
  expect(index).toHaveProperty('isNull')
  expect(index).toHaveProperty('isNullish')
  expect(index).toHaveProperty('isNumber')
  expect(index).toHaveProperty('isObject')
  expect(index).toHaveProperty('isPrimitive')
  expect(index).toHaveProperty('isPromise')
  expect(index).toHaveProperty('isSet')
  expect(index).toHaveProperty('isString')
})
