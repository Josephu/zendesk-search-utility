import readline from 'readline';
import { search } from './searchUtil'
import { listSchema } from './listSchemaUtil'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

interface SearchParameter {
  dataSource: string
  field: string
  value: string
}

export default async function entryQuestion(): Promise<void> {
  const input = await ask(
    'Type "1" to search Zendesk, type "2" to list data source schema, type "quit" to exit\n> '
  )
  if (input === '1') {
    await dataSourceQuestion()
  } else if (input === '2') {
    const userSchema = await listSchema('user')
    const organizationSchema = await listSchema('organization')
    const ticketSchema = await listSchema('ticket')
    const results = await Promise.all([userSchema, organizationSchema, ticketSchema])
    
    console.log('user schema')
    console.log(JSON.stringify(results[0], null, 2))
    console.log('organization schema')
    console.log(JSON.stringify(results[1], null, 2))
    console.log('ticket schema')
    console.log(JSON.stringify(results[2], null, 2))  
  } else if (input === 'quit') {
    rl.close();
  } else {
    console.log(`No such option "${input}"\n`)
  }
  await entryQuestion()
}

async function dataSourceQuestion() {
  const input = await ask(
    'What data source are you looking for? Please type "user", "organization" or "ticket"\n> '
  )
  if (['user', 'organization', 'ticket'].includes(input)) {
    await dataSourceQueryFieldQuestion({
      dataSource: input,
      field: '',
      value: ''
    })
  } else {
    console.log(`No such data source "${input}"\n`)
    await dataSourceQuestion()
  }
}

async function dataSourceQueryFieldQuestion(searchCriteria: SearchParameter) {
  const input = await ask('What field are you querying on?\n> ')
  searchCriteria['field'] = input
  await dataSourceQueryValueQuestion(searchCriteria)
}

async function dataSourceQueryValueQuestion(searchCriteria: SearchParameter) {
  const input = await ask('What value are you querying on?\n> ')
  searchCriteria['value'] = input
  const result = await search(searchCriteria)
  console.log(JSON.stringify(result, null, 2))
}

// ask function that promises to ask a question and
// resolve to an answer
function ask(questionText: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(questionText, (input) => resolve(input.trim()) );
  })
}

rl.on('close', function() {
  console.log("\nHope you enjoyed this tool");
  process.exit(0);
})
