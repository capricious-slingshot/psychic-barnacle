const mongoose = require('mongoose')
const Campsite = require('./models/campsite')

//conection to db on server
const url = 'mongodb://localhost:27017/nucampsite'

// wraps aroud MongoCLient to connect to DB, but has inhanced functionality
const connect = mongoose.connect(url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// returns promise
connect.then(() => {
  console.log('Connected correctly to server')

  //new document(row)
  // Validation erros will be thrown if this info doesn't match schema

  //Syntax 1:
    // create
      // const newCampsite = new Campsite({
      //   name: 'React Lake Campground',
      //   description: 'test'
      // })
    //save
      // newCampsite.save() - returns promise with success status

  //Syntax 2:
  Campsite.create({
    name: 'React Lake Campground',
    description: 'test'
  })
  //returns promise that resolves to the new document
  .then(campsite => {
    console.log(campsite)
    return Campsite.find()
  })
  //^returned found docs in array of objects

  // delete all documents created from campsite model 
  .then(campsites => {
    console.log(campsites)
    return Campsite.deleteMany()
  })
  // connection close
  .then(() => {
    return mongoose.connection.close()
  })
  //error handling and connection close
  .catch(err => {
    console.log(err)
    mongoose.connection.close()
  })
})