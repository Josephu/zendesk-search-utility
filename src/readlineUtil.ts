import readline from 'readline';

export default function setupReadline(): readline.Interface {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  rl.on('close', function() {
    console.log("\nHope you enjoyed this tool");
    process.exit(0);
  })

  return rl
}
