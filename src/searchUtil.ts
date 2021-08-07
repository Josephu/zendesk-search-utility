import * as fs from 'fs'
import StreamArray from 'stream-json/streamers/StreamArray';

interface SearchCriteria {
  dataSource: string
  field: string
  value: string
}

export async function search(searchCriteria: SearchCriteria): Promise<Array<any>> {
  const result:Array<any> = []
  return new Promise((resolve, reject) => {
    const sourceDataFile = `./data/${searchCriteria['dataSource']}s.json`
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

function qualify(jsonObject: any, queryKey: string, queryValue: string): boolean {
  const value = jsonObject[queryKey]
  if (Array.isArray(value) === true) {
    return value.includes(queryValue)
  }
  if (isBoolean(value) || isNumber(value)) {
    return value.toString() === queryValue
  }
  return value === queryValue
}

function isNumber(value: string | number | boolean): boolean {
  return typeof value === 'number' && isFinite(value)
}

function isBoolean(value: string | number | boolean): boolean {
  return typeof value === 'boolean'
}

