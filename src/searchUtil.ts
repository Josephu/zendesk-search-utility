import * as fs from 'fs'
import StreamArray from 'stream-json/streamers/StreamArray';

export interface SearchCriteria {
  table: string
  field: string
  value: string | number | boolean
}

export async function search(searchCriteria: SearchCriteria): Promise<Array<any>> {
  const result:Array<any> = []
  return new Promise((resolve, reject) => {
    const sourceDataFile = `./data/${searchCriteria['table']}s.json`
    fs.createReadStream(sourceDataFile)
      .pipe(StreamArray.withParser())
      .on('data', data => {
        const jsonObject = data.value
        if (qualify(jsonObject, searchCriteria['field'], searchCriteria['value'])) {
          result.push(data.value)
        }
      })
      .on('finish', () => resolve(result))
      .on('error', (err) => reject(err))
  })
}

function qualify(jsonObject: any, queryKey: string, queryValue: string | number | boolean): boolean {
  const value = jsonObject[queryKey]
  if (Array.isArray(value) === true) {
    return value.includes(queryValue)
  }
  return value === queryValue
}
