const express = require('express')

const app = express()

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

app.get('/api/persons', (req, resp) => {
  resp.json(persons)
})

app.get('/api/info', (req, resp) => {
  resp.send(`puhelinluettelossa ${persons.length} henkilön tiedot <br /> <br /> ${new Date()}`)
})

app.get('/api/persons/:id', (req, resp) => {
  const id = Number(req.params.id)
  const person = persons.filter(p => p.id === id)[0]

  person ? resp.json(person) : resp.status(404).end()
})

app.delete('/api/persons/:id', (req, resp) => {
  const id = Number(req.params.id)

  persons = persons.filter(p => p.id !== id)
  resp.status(204).end()
})

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
