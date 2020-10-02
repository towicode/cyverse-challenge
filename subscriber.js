const NATS = require('nats')
const nc = NATS.connect("demo.nats.io:4222")
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('/var/www/html/db.json')
const db = low(adapter)

db.defaults({ posts: [] })
    .write()

// Simple Subscriber
nc.subscribe('towicode_cy8889a', function (msg) {
    console.log('Received a message: ' + msg)
    db.get('posts')
        .push(msg)
        .write()
})
