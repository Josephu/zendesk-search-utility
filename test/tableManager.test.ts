import TableManager from '../src/tableManager'

describe('TableManager', () => {
  let tableManager: TableManager

  beforeAll(async () => {
    tableManager = new TableManager(['test'])
    await tableManager.setupTableSchema()
  })

  describe('#isTableSupported', () => {
    it('true', () => {
      expect(tableManager.isTableSupported('test')).toEqual(true)
    })

    it('false', () => {
      expect(tableManager.isTableSupported('random')).toEqual(false)
    })
  })

  describe('#isTableFieldValid', () => {
    it('true', () => {
      expect(tableManager.isTableFieldValid('test', '_id')).toEqual(true)
    })

    it('false', () => {
      expect(tableManager.isTableFieldValid('test', 'random')).toEqual(false)
    })
  })

  describe('#isTableFieldValueTypeValid', () => {
    it('type is number', () => {
      expect(tableManager.isTableFieldValueTypeValid('test', '_id', '1')).toEqual(true)
      expect(tableManager.isTableFieldValueTypeValid('test', '_id', 'some string')).toEqual(false)
    })

    it('type is boolean', () => {
      expect(tableManager.isTableFieldValueTypeValid('test', 'active', 'true')).toEqual(true)
      expect(tableManager.isTableFieldValueTypeValid('test', 'active', 'some string')).toEqual(false)
    })

    it('type is string', () => {
      expect(tableManager.isTableFieldValueTypeValid('test', 'name', '1')).toEqual(true)
      expect(tableManager.isTableFieldValueTypeValid('test', 'name', 'some string')).toEqual(true)
    })
  })

  describe('#transformToCorrectDataTypeBySchema', () => {
    it('type is number', () => {
      expect(tableManager.transformToCorrectDataTypeBySchema('test', '_id', '1')).toEqual(1)
    })

    it('type is boolean', () => {
      expect(tableManager.transformToCorrectDataTypeBySchema('test', 'active', 'true')).toEqual(true)
      expect(tableManager.transformToCorrectDataTypeBySchema('test', 'active', 'false')).toEqual(false)
    })

    it('type is string', () => {
      expect(tableManager.transformToCorrectDataTypeBySchema('test', 'name', 'some string')).toEqual('some string')
    })
  })
})
