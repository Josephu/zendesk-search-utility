import { listSchema } from '../src/listSchemaUtil'

describe('list schema', () => {
  it('return result', async () => {
    const result = await listSchema('test')
    expect(result.length).toEqual(19)
    expect(result[0]).toEqual('_id')
    expect(result[18]).toEqual('role')
  })
})