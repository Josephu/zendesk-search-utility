import { isNumber, isBoolean, determineType } from '../src/util'

describe('util', () => {
  describe('#isNumber', () => {
    it('is number', () => {
      expect(isNumber(1)).toEqual(true)
    })

    it('is not number', () => {
      expect(isNumber('abc')).toEqual(false)
    })
  })

  describe('#isBoolean', () => {
    it('is boolean', () => {
      expect(isBoolean(true)).toEqual(true)
    })

    it('is not boolean', () => {
      expect(isBoolean('abc')).toEqual(false)
    })
  })

  describe('#determineType', () => {
    it('is boolean', () => {
      expect(determineType(true)).toEqual('boolean')
    })

    it('is number', () => {
      expect(determineType('abc')).toEqual('string')
    })

    it('is string', () => {
      expect(determineType(1)).toEqual('number')
    })
  })
})
