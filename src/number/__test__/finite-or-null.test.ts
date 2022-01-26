import { finiteOrNull } from '../finite-or-null'

test('finiteOrNull', () => {
  expect(finiteOrNull(1)).toBe(1)
  expect(finiteOrNull(NaN)).toBe(null)
  expect(finiteOrNull(Infinity)).toBe(null)
  expect(finiteOrNull(-Infinity)).toBe(null)
})
