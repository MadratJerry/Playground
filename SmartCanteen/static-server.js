const express = require('express')
const app = express()
const http = require('http')
const HTTP_PORT = 8080

app.use('/', express.static(__dirname + '/app/build'))

http.createServer(app).listen(HTTP_PORT, function() {
  console.log('Server started...')
})

module.exports.PORT = HTTP_PORT
