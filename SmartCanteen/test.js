const net = require('net')
const readline = require('readline')

var HOST = '139.199.180.242'
var HOST = 'localhost'
var PORT = 17325

var client = new net.Socket()

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min //The maximum is exclusive and the minimum is inclusive
}

client.connect(PORT, HOST, function() {
  console.log('CONNECTED TO: ' + HOST + ':' + PORT)
  // client.write(
  //   `0x${getRandomInt(1, 9)} 0x${getRandomInt(1, 9)} 0x${getRandomInt(
  //     1,
  //     9
  //   )} 0x${getRandomInt(1, 99)}`
  // )
  client.write(String.fromCharCode(...[1, 1, 13, 10]))
  // rl.on('line', input => {
  //   // client.write(String.fromCharCode(...[1, 32, 3, 6]))
  //   // client.write(String.fromCharCode(...[0, 23, 0, 23]))
  //   client.write('\nfdsf\nfdsf\n')
  //   client.write(input)
  // })
})

// client.on('data', function(data) {
//   console.log('DATA: ' + data)
//   client.destroy()
// })

client.on('close', function() {
  console.log('Connection closed')
})
