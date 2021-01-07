const express = require('express')
const app = express()
const cors = require('cors')
const port = 3005
const companies = require('./companies')

app.use(cors())

app.get('/', (req, res) => {
  res.send(companies)
})

app.listen(port, () => console.log(`Demo server listening on port ${port}!`))
