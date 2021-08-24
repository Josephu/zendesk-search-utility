import Cli from './src/cli'

async function run() {
  const cli = new Cli()
  await cli.init()
  cli.start()
}

run()