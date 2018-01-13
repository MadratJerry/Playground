module.exports.addOrder = addOrder
module.exports.urgeOrder = urgeOrder
module.exports.newClient = newClient

const server = require('./static-server')
const db = require('./db')
const wss = require('./ws')
const WebSocket = require('ws')
const tcp = require('./tcp')

const fetch = require('node-fetch')
const ws = new WebSocket(`ws://localhost:8181`)

function addOrder(dishes, table) {
  let obj = { dishes: dishes, time: Date.now(), price: 0, table: table }
  dishes.forEach((e, index) => {
    fetch(`http://localhost:${db.PORT}/dish/${e.id}`)
      .then(res => res.json())
      .then(res => {
        res.num += e.num
        obj.price += e.num * res.price
        return fetch(`http://localhost:${db.PORT}/dish/${e.id}`, {
          method: 'put',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(res)
        })
      })
      .then(() => {
        ws.send(`/update dish ${e.id}`)
        if (index === dishes.length - 1)
          fetch(`http://localhost:${db.PORT}/order/`, {
            method: 'post',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
          })
            .then(res => res.json())
            .then(res => {
              ws.send(`/add order ${res.id}`)
              console.log(`ADDORDER: ${table} ${dishes}`)
            })
      })
  })
}

function urgeOrder(table) {
  ws.send(`/urge ${table}`)
  console.log(`URGE: ${table}`)
}

function newClient(state, ip, port) {
  ws.send(state ? `/client ${ip} ${port}` : `/close ${ip} ${port}`)
}

function initDish() {
  for (let i = 1; i < 13; i++) {
    fetch(`http://localhost:${db.PORT}/dish/${i}`)
      .then(res => res.json())
      .then(res => {
        res.num = 0
        return fetch(`http://localhost:${db.PORT}/dish/${i}`, {
          method: 'put',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(res)
        })
      })
  }
}
