//This import necessary for .env file to be executed
require('dotenv').config()

//Imports
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const moment = require("moment");
const app = express()
//login import
//const cors = require('cors')
const {ObjectId, MongoClient} =require ("mongodb")
mongoose.set("useFindAndModify", false);

//const user = process.env.USER
//const password = process.env.PASSWORD

//global variables
const port = process.env.PORT || 5000
const staticDir = process.env.PRODUCTION
  ? path.resolve("./client/build")
  : path.resolve("./client/public");

//const MONGODB_URI = process.env.MONGODB_URI;
//mongoose.set("useFindModify", false)

//const uri = process.env.MONGODB_URI;
const mongoAtlasUri=`mongodb+srv://kavitha:aP3K0aEfoIOSxe4P@log.e8qqp.mongodb.net/tilEntries?retryWrites=true&w=majority`
//server set-up-middleware req  for set-up and read the body
//app.use(express.static("./client/build"))
//app.use(express.urlencoded({ extended: true
//}))
app.use(express.json())
app.use(express.static(staticDir));
app.use(
  express.urlencoded({
    extended: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
)
//app.use(cors())

/*app.use('/', (req, res) => {
  res.send({
    token: 'test123'
  });
})*/
//const MONGODB_URI = process.env.MONGODB_URI;
//set-up to the database(local)
mongoose.connect(mongoAtlasUri,
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
  tags: [{ type: String }],

})
//mongoose collection and schema is assigned to a reference model
const EntryModel = mongoose.model('entries', EntrySchema)
EntryModel.createIndexes()
//routing to public folder
//app.use(express.static("./public"))

//-----------------------Back-End server--------------------------------------------------

//add a single entry using the user's input
app.post('/addEntry', async (req, res) => {

  let entryTime = moment().format('llll')
  //Uses a newVariable to store the input
  let newEntry = new EntryModel({
    title: req.body.title,
    content: req.body.content,
    date: entryTime,
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
  const cursor = await EntryModel.find({}).sort({date: -1})
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
  const cursor = await EntryModel.find({ [key]: `${temp}` }).sort({date: -1})
  let results = [];

  // iterate over out cursor object to push each document into our array
  await cursor.forEach((entry) => {
    results.push(entry);
  })
  console.log(results)
  res.json(results);

});
//--------------------------------------------------------------------------------

//Full text Search
app.get("/search", async (req, res) => {
  //The variable query is assigned to get the query from front-end
  let query = req.query;
  let key = Object.keys(query)[0];
  //this gives just the value of query
  let temp = query[key];
  console.log(temp);
  // Full text search using the wildcard specifier,allows text search on all fields
  await EntryModel.createIndexes({ "$**": "text" });
  //querying the database using the query filters
  const cursor = await EntryModel.find({ $text: { $search: temp } });

  console.log(cursor);
  // create empty array to hold our results
  let results = [];
  await cursor.forEach((entry) => {
    results.push(entry);
  });

  // send the resulting array back as a json
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
      //date: Date.now(),
      content: req.body.content,
      tags: req.body.tags,
      //username: req.body.username,
      //password: req.body.password,
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
//res.sendStatus(200)
})



//--------------------------------------------------------------------------------
//set up to catch all route 
app.get('*', (req, res) => {
  res.sendFile(path.resolve("./client/build/index.html"))
});



// set up server to listen to requests at the port specified
app.listen(port, () => {
  console.log('listening on port:', port)
})
//----------------------------------------------------------------

