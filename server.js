//This import necessary for .env file to be executed
require('dotenv').config()

//Imports
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
mongoose.set("useFindAndModify", false);
const { readdir } = require("fs")
//const user = process.env.USER
//const password = process.env.PASSWORD


//global variables
const port = process.env.PORT || 5000
const staticDir = path.resolve('./client/public')
const app = express()
//mongoose.set("useFindModify", false)

//imports for authentication purpose
//const passport = require('passport')

//server set-up-middleware req  for set-up and read the body
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
  tags: Array,
  //tags:[{type:String}]
})
//mongoose collection and schema is assigned to a reference model
const EntryModel = mongoose.model('entries', EntrySchema)

//routing to public folder
//app.use(express.static("./public"))

//-----------------------Back-End server--------------------------------------------------

//add a single entry using the user's input
app.post('/addEntry', async (req, res) => {
  //Uses a newVariable to store the input
  let newEntry = new EntryModel({
    title: req.body.title,
    content: req.body.content,
    date: new Date().getTime(),
    tags: req.body.tags,
  })
  //accepts new entry and stores in the db
  await newEntry.save(function (err) {
    if (err) throw err
  })
  res.redirect('/')

})
//List all entries 
app.get("/api", async (req, res) => {
  // find all documents in the entry collection (as defined above)
  const cursor = await EntryModel.find({})
  // create empty array to hold our results
  let results = [];
  // iterate over out cursor object to push each document into our array
  await cursor.forEach((entry) => {
    results.push(entry);
  });

  // send the resulting array back as a json
  res.json(results);
});
//----------------------------------------------------------------

//Filter according to the tags request
app.get("/filter", async (req, res) => {
  let filter = req.query
  console.log(filter)
  let key = Object.keys(filter)[0].toLowerCase()
  console.log(key)
  let temp = filter[key]
  console.log(temp)
  const cursor = await EntryModel.find({ [key]: `${temp}` });
  let results = [];

  // iterate over out cursor object to push each document into our array
  await cursor.forEach((entry) => {
    results.push(entry);
  })
  res.json(results);

});

//---------------------------------------------------------------------------

//return a specific entry/post  data from database
app.get('/api/:id', async (req, res) => {
  let id = req.params.id
  let entryData = await EntryModel.findOne({ _id: id })

  res.json(entryData)
})

//--------------------------------------------------------------------------------

//edit an entry from database
app.post('/editEntry/:id', async (req, res) => {
  let id = req.params.id
await EntryModel.findOneAndUpdate(
    { _id: id },
    {
      title: req.body.title,
      date: Date.now(),
      content: req.body.content,
      tags: req.body.tags, 
    },
    {
      new: true,
    }
  );

  res.redirect('/Facts')
})
//--------------------------------------------------------------------------------
//delete an entry in the database
app.get('/delete/:id', async (req, res) => {
  //stores in id
  let id = req.params.id
  //id is passed here as ObjectId to be deleted
  await EntryModel.findOneAndDelete({ _id: id })
  res.sendStatus(200)
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
//----------------------------------------------------------------

