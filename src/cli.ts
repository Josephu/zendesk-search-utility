import { search } from './searchUtil'
import TableManager from './tableManager'
import { SUPPORTED_TABLES } from './tableManager'
import setupReadline from './readlineUtil'
import readline from 'readline';

export default class Cli {
  tableManager: TableManager
  rl: readline.Interface
  searchResult: any[]

  constructor (supportedTables?: string[]) {
    this.tableManager = new TableManager(supportedTables)
    this.rl = setupReadline()
    this.searchResult = []
  }

  // init function need to be called before starting Cli
  async init(): Promise<void> {
    await this.tableManager.setupTableSchema()
  }

  // start function starts the cli
  async start(): Promise<void> {
    const tablesString = SUPPORTED_TABLES.map((t) => `"${t}"`).join(', ')
    const input = await this.ask(
      `What table are you searching on? Type ${tablesString} for tables, or "quit" to finish the app\n> `
    )
    if (this.tableManager.isTableSupported(input)) {
      await this.askForField(input)
    }
    else if (input === 'quit') {
      this.rl.close();
    }
    else {
      console.log(`No such table "${input}"\n`)
    }
    await this.start()
  }

  async askForField(table: string): Promise<void> {
    console.log('The fields you can query on this table are: ')
    console.log(this.tableManager.prettyPrintTableSchema(table))
    const input = await this.ask('What field are you querying on?\n> ')
    if (this.tableManager.isTableFieldValid(table, input)) {
      await this.askForValue(table, input)  
    } else {
      console.log(`No such field "${input}" for table "${table}"\n`)
      await this.askForField(table)
    }
  }

  async askForValue(table: string, field: string): Promise<void> {
    const input = await this.ask('What value are you querying on? (Use true/false for boolean field)\n> ')
    if (this.tableManager.isTableFieldValueTypeValid(table, field, input)) {
      const value = this.tableManager.transformToCorrectDataTypeBySchema(table, field, input)
      this.searchResult = await search({
        table: table,
        field: field,
        value: value
      })
      if (this.searchResult.length > 0) {
        console.log(JSON.stringify(this.searchResult, null, 2))
      } else {
        console.log('No data found.')
      }
    } else {
      const dataType = this.tableManager.getTableFieldType(table, field)
      console.log(`Data type is incorrect. Expect ${dataType} for table "${table}"\n`)
      await this.askForValue(table, field)
    }
  }

  // ask function that promises to ask a question and
  // resolve to an answer
  async ask(questionText: string): Promise<string> {
    return new Promise((resolve) => {
      this.rl.question(questionText, (input) => resolve(input.trim()) );
    })
  }
}
