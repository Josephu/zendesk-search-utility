import { search } from '../src/searchUtil'

describe('when search for field of boolean type', () => {
  it('is true', async () => {
    const result = await search({
      dataSource: 'test',
      field: 'active',
      value: 'true'
    })
    expect(result.length).toEqual(2)
    expect(result[0]['_id']).toEqual(1)
    expect(result[1]['_id']).toEqual(2)
  })

  it('is false', async () => {
    const result = await search({
      dataSource: 'test',
      field: 'active',
      value: 'false'
    })
    expect(result.length).toEqual(1)
    expect(result[0]['_id']).toEqual(3)
  })
})

describe('when search for field of number type', () => {
  it('exist', async () => {
    const result = await search({
      dataSource: 'test',
      field: 'organization_id',
      value: '119'
    })
    expect(result.length).toEqual(1)
    expect(result[0]['_id']).toEqual(1)
  })

  it('not exist', async () => {
    const result = await search({
      dataSource: 'test',
      field: 'organization_id',
      value: '1'
    })
    expect(result.length).toEqual(0)
  })
})

describe('when search for field of array type', () => {
  it('exist', async () => {
    const result = await search({
      dataSource: 'test',
      field: 'tags',
      value: 'Wescosville'
    })
    expect(result.length).toEqual(1)
    expect(result[0]['_id']).toEqual(3)
  })
})

describe('when search for field of string type', () => {
  it('exist', async () => {
    const result = await search({
      dataSource: 'test',
      field: 'timezone',
      value: 'Armenia'
    })
    expect(result.length).toEqual(1)
    expect(result[0]['_id']).toEqual(2)
  })
})