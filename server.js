//This import necessary for .env file to be executed
require('dotenv').config()

//Imports
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const { ObjectId } = require("mongodb");

//const user = process.env.USER
//const password = process.env.PASSWORD


//global variables
const port = process.env.PORT || 5000
const staticDir = path.resolve('./client/public')

//imports for authentication purpose
//const passport = require('passport')

//server set-up-middleware req  for set-up and read the body
const app = express()
app.use(express.static(staticDir))
app.use(express.urlencoded({ extended: true }))
//app.use(passport.initialize())

//set-up to the database(local)
mongoose.connect('mongodb://localhost:27017/tilEntries',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

//ref to the local database
const tilEntriesDB = mongoose.connection
// for connection error
tilEntriesDB.on('error',
  console.error.bind(console, "connection error:"))

//set-up user entry schema
const EntrySchema = new mongoose.Schema({
  title: String,
  content: String,
  date: Date,
  tag: Array,
})
//mongoose collection and schema is assigned to a reference model
const EntryModel = mongoose.model('entries', EntrySchema)

//routing to public folder
app.use(express.static("./public"))

//-----------------------Back-End server--------------------------------------------------


//List all entries 
app.get("/api", async (req, res) => {
  // find all documents in the entry collection (as defined above)
  const cursor = await EntryModel.find({});
  // create empty array to hold our results
  let results = [];
  // iterate over out cursor object to push each document into our array
  await cursor.forEach((entry) => {
    results.push(entry);
  });

  // send the resulting array back as a json
  res.json(results);
});
//--------------------------------------------------------------------------------
//add a single entry using the user's input
app.post('/addEntry', async (req, res) => {

  let newEntry = new EntryModel({
    title: req.body.title,
    content: req.body.content,
    date: new Date(),
    tag: req.body.tag,
  })
  await newEntry.save(function (err) {
    if (err) throw err
  })
  res.redirect('/')

})
//-------------------------------------------------------------
app.get("/filter", async (req, res) => {
  let filter = req.query
  let key = Object.keys(filter)[0]
  let temp = filter[key]
  const cursor = await EntryModel.find({ [key]: temp });
  let results = [];

  // iterate over out cursor object to push each document into our array
  await cursor.forEach((entry) => {
    results.push(entry);
  })
  res.json(results)
})
//---------------------------------------------------------------------------

//return a specific entry/post  data from database
app.get('/api/:id', async (req, res) => {
  let id = req.params.id
  let entryData = await EntryModel.findOne({ _id: ObjectId(id) })

  res.json(entryData)
})

//--------------------------------------------------------------------------------

//edit an entry from database
app.post('/editEntry/:id', async (req, res) => {
  let id = req.params.id
  await EntryModel.findOneAndUpdate(
    { _id: ObjectId(id) }, {
    title: req.body.title,
    content: req.body.content,
    date: Date.now(),
    tag: [req.body.tag],
  },

    {
      new: true,
    }
  )
  res.redirect('/Facts')
})
//--------------------------------------------------------------------------------
//delete an entry in the database
app.get('/delete/:id', async (req, res) => {
  let id = req.params.id

  await EntryModel.findOneAndDelete({ _id: ObjectId(id) })
  res.redirect('/')
})


//--------------------------------------------------------------------------------
//set up to catch all route 
app.get('*', (req, res) => {
  res.sendFile(path.resolve('./client/public/index.html'))
});

// set up server to listen to requests at the port specified
app.listen(port, () => {
  console.log('listening on port:', port)
})

