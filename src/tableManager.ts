import { listSchema, DataTypeDefinition } from './listSchemaUtil'

export const SUPPORTED_TABLES = ['user', 'organization', 'ticket']

export default class TableManager {
  tables: Map<string, DataTypeDefinition>
  supportedTables: string[]

  constructor(supportedTables?: string[]) {
    this.tables = new Map()
    this.supportedTables = supportedTables || SUPPORTED_TABLES
  }

  // Setup the table manager to have basic schema info
  // for all the supported tables
  async setupTableSchema(): Promise<void> {
    const result = await Promise.all(
      this.supportedTables.map(tableName => listSchema(tableName))
    )
    this.supportedTables.forEach((tableName, i) => {
      this.tables.set(tableName, result[i])  
    })
  }

  isTableSupported(tableName: string): boolean {
    return this.supportedTables.includes(tableName)
  }

  isTableFieldValid(tableName: string, fieldName: string): boolean {
    const table = this.getTableSchema(tableName)
    return table.get(fieldName) !== undefined
  }

  transformToCorrectDataTypeBySchema(tableName: string, fieldName: string, value: string): string | boolean | number {
    const dataType = this.getTableFieldType(tableName, fieldName)

    if (dataType === 'number') {
      return Number(value)
    } else if (dataType === 'boolean') {
      return value === 'true'
    }
    return value
  }

  isTableFieldValueTypeValid(tableName: string, fieldName: string, value: string): boolean {
    const dataType = this.getTableFieldType(tableName, fieldName)

    if (dataType === 'number') {
      return !isNaN(Number(value))
    } else if (dataType === 'boolean') {
      return ['true', 'false'].includes(value)
    }
    return true
  }

  getTableFieldType(tableName: string, fieldName: string): string | undefined {
    const table = this.getTableSchema(tableName)
    return table.get(fieldName)
  }

  getTableSchema(tableName: string): DataTypeDefinition {
    return this.tables.get(tableName) || new Map()
  }

  prettyPrintTableSchema(tableName: string): string {
    const table = this.getTableSchema(tableName)
    let result = ''
    for (const field of table.keys()) {
      result += `${field} (${table.get(field)})\n`
    }
    return result
  }
}
