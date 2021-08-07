import * as fs from 'fs'
import StreamValues from 'stream-json/streamers/StreamArray';

export async function listSchema(dataSource: string): Promise<Array<any>> {
  let result:Array<any>
  return new Promise((resolve, reject) => {
    const sourceDataFile = `./data/${dataSource}s.json`
    const fileStream = fs.createReadStream(sourceDataFile)
    fileStream
      .pipe(StreamValues.withParser())
      .on('data', data => {
        result = Object.keys(data.value)
        // Early finish as we don't need to run through full dataset
        // to analyse the schema
        fileStream.close()
        resolve(result)
      })
      .on('error', (err) => reject(err))
  })
}
