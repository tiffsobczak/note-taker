const express = require('express')
const path = require('path')
const fs = require('fs')
const uuid=require('uuid')
const app = express()
const port = process.env.PORT || 3000


app.use(express.json())
app.use(express.static("public"))

//Returns "notes" page
const notes=path.join(__dirname, "./public/notes.html")
app.get('/notes', (req, res) => {
  res.sendFile(notes)
})

//Returns notes in JSON format
app.get('/api/notes', (req, res) => {
   const data=fs.readFileSync(path.join(__dirname, "./db/db.json"))
   const json=JSON.parse(data.toString())
   res.json(json)
})

//Add a note to the database
app.post('/api/notes', (req, res) => {
    const data=req.body
    data.id=uuid.v4()
    const dbPath=path.join(__dirname, "./db/db.json")
    //Parsing dbPath data to an array to be readable
    const currentNotes=JSON.parse(fs.readFileSync(dbPath).toString())
    //adding the new note to existing notes
    currentNotes.push(data)
    //overriding the current file with the new list
    fs.writeFileSync(dbPath, JSON.stringify(currentNotes, null, 2))
    res.json(data)
 })

 app.delete('/api/notes/:id', (req, res) => {
    const id=req.params.id
    const dbPath=path.join(__dirname, "./db/db.json")
    //Parsing dbPath data to an array to be readable
    const currentNotes=JSON.parse(fs.readFileSync(dbPath).toString())
    const remainingNotes=currentNotes.filter((note)=> {
    return id !==note.id
    })
    //overriding the current file with the new list
    fs.writeFileSync(dbPath, JSON.stringify(remainingNotes, null, 2))
    res.status(200).end()
 })


 //Returns index page
const index=path.join(__dirname, "./public/index.html")
app.get('*', (req, res) => {
  res.sendFile(index)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

