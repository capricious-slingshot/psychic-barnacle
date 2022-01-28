const mongoose = require('mongoose')
const Schema = mongoose.Schema

// new schema params: (dataHash, configOptions)
const campsiteSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

//mongoose automagically looks for the lowercase plural version of the colection
// params: (CollectionName, schemaName)
const Campsite = mongoose.model('Campsite', campsiteSchema)

module.exports = Campsite