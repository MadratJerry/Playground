const WebSocketServer = require('ws').Server
const WebSocket = require('ws')
const WS_PORT = 8181

const wss = new WebSocketServer({ port: WS_PORT })

// wss.on('connection', function(ws) {
//   console.log('Client connected...')

//   ws.on('message', function(message) {
//     console.log(message)
//     ws.send(message)
//   })
// })
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data)
    }
  })
}

wss.on('connection', function connection(ws) {
  console.log('Client connected...')
  ws.on('message', function incoming(data) {
    // Broadcast to everyone else.
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data)
      }
    })
  })
})

module.exports = wss
module.exports.PORT = WS_PORT
