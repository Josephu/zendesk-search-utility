import { listSchema } from '../src/listSchemaUtil'

describe('listSchemaUtil', () => {
  it('list schema and return result', async () => {
    const result = await listSchema('test')
    expect(result.get('_id')).toEqual('number')
    expect(result.get('name')).toEqual('string')
    expect(result.get('active')).toEqual('boolean')
  })
})
