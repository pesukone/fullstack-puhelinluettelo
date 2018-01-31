const goose = require('mongoose')

const url = 'mongodb://fullstack:sekred@ds119028.mlab.com:19028/fullstack'

goose.connect(url)
goose.Promise = global.Promise

const Person = goose.model('Person', {
  name: String,
  number: String
})

module.exports = Person
