const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const DB_PORT = 8000

server.use(middlewares)
server.use(router)
server.listen(DB_PORT, () => {
  console.log('JSON Server is running')
})

module.exports.PORT = DB_PORT
