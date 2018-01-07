var readline = require('readline')

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.on('line', input => {
  console.log(`Received: ${input}`)
})

// rl.question('你叫什么？', function(answer) {
//   // 不加close，则不会结束
//   rl.close()
// })
