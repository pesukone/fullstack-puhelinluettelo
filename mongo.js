const goose = require('mongoose')

const url = 'mongodb://fullstack:Konditionaal1@ds119028.mlab.com:19028/fullstack'

goose.connect(url)
goose.Promise = global.Promise

const Number = goose.model('Number', {
  name: String,
  number: String
})

if (process.argv[2] && process.argv[3]) {
  const entry = new Number({
    name: process.argv[2],
    number: process.argv[3]
  })

  console.log(`lisätään henkilö ${process.argv[2]} numero ${process.argv[3]} luetteloon`)

  entry
    .save()
    .then(res => {
      goose.connection.close()
    })
} else {
  Number
    .find({})
    .then(res => {
      console.log("puhelinluettelo:")
      res.forEach(entry => {
        console.log(`${entry.name} ${entry.number}`)
      })
      goose.connection.close()
    })
}
