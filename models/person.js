const goose = require('mongoose')
const Schema = goose.Schema

const url = 'mongodb://fullstack:sekred@ds119028.mlab.com:19028/fullstack'

goose.connect(url)
goose.Promise = global.Promise

const personSchema = new Schema({
  name: String,
  number: String
})

personSchema.statics.format = function(person) {
  return {
    name: person.name,
    number: person.number,
    id: person._id
  }
}

const Person = goose.model('Person', personSchema)

module.exports = Person
