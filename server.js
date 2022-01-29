const express = require('express')
const path = require('path')
const app = express()
const port = 3000


const notes=path.join(__dirname, "./public/notes.html")
app.get('/notes', (req, res) => {
  res.sendFile(notes)
})

const index=path.join(__dirname, "./public/index.html")
app.get('*', (req, res) => {
  res.sendFile(index)
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

