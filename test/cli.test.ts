import Cli from '../src/cli'
import { stdin } from 'mock-stdin'

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

describe('Cli', () => {
  let stdinMock: any;

  beforeEach(() => {
    stdinMock = stdin()
  })

  it('search and quit', async () => {
    const cli = new Cli(['test'])
    await cli.init()
    jest.spyOn(process, 'exit').mockImplementation(() => { throw new Error('') })
    process.nextTick(async () => {
      stdinMock.send('test\r')
      await delay(1)
      stdinMock.send('_id\r')
      await delay(1)
      stdinMock.send('1\r')
      await delay(500) // There is a slight risk that this may go overtime
      stdinMock.send('quit\r')
    })
    await expect(cli.start()).rejects.toThrow()
    expect(cli.searchResult.length).toEqual(1)
    expect(cli.searchResult[0]._id).toEqual(1)
  })
})
