const express = require('express')
const app = express()
const port = 8080

app.get('/tickets', (req, res) => {
  res.send({id: 1, status: "done", description: "do the shit"})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})