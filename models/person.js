const goose = require('mongoose')
const Schema = goose.Schema

const url = process.env.MONGODB_URI

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
