import * as fs from 'fs'
import StreamValues from 'stream-json/streamers/StreamArray';
import { determineType } from './util'

export type DataTypeDefinition = Map<string, string>

export async function listSchema(dataSource: string): Promise<DataTypeDefinition> {
  return new Promise((resolve, reject) => {
    const sourceDataFile = `./data/${dataSource}s.json`
    const fileStream = fs.createReadStream(sourceDataFile)
    fileStream
      .pipe(StreamValues.withParser())
      .on('data', result => {
        const data = result.value
        const fields = Object.keys(data)
        const dataTypeDefinition = new Map()
        fields.forEach(field => dataTypeDefinition.set(field, determineType(data[field])))

        // Early finish as we don't need to run through full dataset
        // to analyse the schema
        fileStream.close()
        resolve(dataTypeDefinition)
      })
      .on('error', (err) => reject(err))
  })
}
