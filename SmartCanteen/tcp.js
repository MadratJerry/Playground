const net = require('net')
const addOrder = require('./index').addOrder
const urgeOrder = require('./index').urgeOrder
const newClient = require('./index').newClient
const server = net.createServer()
const TCP_PORT = 17325

console.log(addOrder)

server.on('connection', function(sock) {
  console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort)
  newClient(true, sock.remoteAddress, sock.remotePort)
  sock.setEncoding('utf8')

  sock.on('data', function(data) {
    console.log('DATA ' + sock.remoteAddress + ': ' + data)
    for (let i = 0; i < data.length; i++) console.log(data.charCodeAt(i))
    if (data.length > 1) {
      let obj = []
      let order = []
      let func = data.charCodeAt(0)
      let table = data.charCodeAt(1)
      switch (func) {
        case 1:
          for (let i = 2; i < data.length; i++) {
            let e = data.charCodeAt(i)
            if (!obj[e]) obj[e] = 1
            else obj[e]++
          }
          obj.forEach((e, index) => {
            if (index > 0 && index <= 12) order.push({ id: index, num: e })
          })
          addOrder(order, table)
          break
        case 2:
          urgeOrder(table)
          break
        default:
          break
      }
    }
    sock.write(data)
  })

  sock.on('close', function(data) {
    newClient(false, sock.remoteAddress, sock.remotePort)
    console.log('CLOSED: ' + sock.remoteAddress + ' ' + sock.remotePort)
  })
})
server.listen(TCP_PORT, '0.0.0.0')

module.exports.PORT = TCP_PORT
