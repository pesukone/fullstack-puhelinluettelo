const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

const Person = require('./models/person')

const app = express()
app.use(bodyParser.json())
app.use(morgan(':method :url :data :status :res[content-length] - :response-time ms'))
app.use(cors())
app.use(express.static('build'))

morgan.token('data', (req, resp) => JSON.stringify(req.body))

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Matti Tienari",
    number: "040-123456",
    id: 2
  },
  {
    name: "Arto Järvinen",
    number: "040-123456",
    id: 3
  },
  {
    name: "Lea Kutvonen",
    number: "040-123456",
    id: 4
  }
]

app.get('/persons', (req, resp) => {
  Person
    .find({})
    .then(persons => {
      resp.json(persons.map(Person.format))
    })
})

app.get('/info', (req, resp) => {
  Person
    .find({})
    .then(persons => {
      resp.send(`puhelinluettelossa ${persons.length} henkilön tiedot <br /> <br /> ${new Date()}`)
    })
})

app.get('/persons/:id', (req, resp) => {
  Person.findById(req.params.id, (err, person) => {
    person ? resp.json(Person.format(person)) : resp.status(404).end()
  })
})

app.delete('/persons/:id', (req, resp) => {
  Person.findByIdAndRemove(req.params.id, (err, person) => {
    if (err) {
      console.log(err)
    }
    resp.status(204).end()
  })
})

app.put('/persons/:id', (req, resp) => {
  Person.findById(req.params.id, (err, person) => {
    if (err) {
      resp.status(500).send(err)
    }

    person.number = req.params.number || person.number
    person.save((err, person) => {
      if (err) {
        resp.status(500).send(err)
      } else {
        resp.json(person)
      }
    })
  })
})

app.post('/persons', (req, resp) => {
  if (!req.body.name) {
    return resp.status(400).json({ error: "invalid name" })
  }

  if (!req.body.number) {
    return resp.status(400).json({ error: "invalid number" })
  }

  Person
    .find({ name: req.body.name })
    .then(result => {
      if (!result[0]) {
        const person = new Person({
          name: req.body.name,
          number: req.body.number
        })

        person
          .save()
          .then(savedPerson => {
            resp.json(Person.format(savedPerson))
          })
      } else {
        resp.status(400).json({ error: "name must be unique" })
      }
    })
})

const formatPerson = (person) => {
  return {
    name: person.name,
    number: person.number,
    id: person.id
  }
}

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
