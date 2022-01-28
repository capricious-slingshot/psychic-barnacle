const mongoose = require('mongoose')
const Campsite = require('./models/campsite')

//conection to db on server
const url = 'mongodb://localhost:27017/nucampsite'

// wraps aroud MongoCLient to connect to DB, but has inhanced functionality
const connect = mongoose.connect(url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
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
    // params: docID, Obj with update operator, field to be changed 
    return Campsite.findByIdAndUpdate(campsite._id, {
      $set: { description: 'UPdated Test Docment'}
    }, {
      // requires promise to return updated object - not the defalut behavior
      new: true
    })
  })
  //^returned updated object
  .then(campsite => {
    console.log(campsite)
    //campsite.comments is subdocument - stored as array
    campsite.comments.push({
      rating: 5,
      text: 'What a magnificent view!',
      author: 'Tinus Lorvaldes'
    })

    return campsite.save()
  })
  // delete documents created from campsite model 
  .then(campsite => {
    console.log(campsite) // logging doc with sub document
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