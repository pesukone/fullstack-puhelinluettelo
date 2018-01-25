const express = require('express')

const app = express()

const persons = [
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

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
