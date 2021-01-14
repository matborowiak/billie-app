const express = require('express')
const cors = require('cors')
const companies = require('./public/companies')

const app = express()
const port = 3005

app.use(cors())

app.get('/', (req, res) => {
  res.send(companies)
})

app.listen(port, () => console.log(`Test server listening on port ${port}!`))
