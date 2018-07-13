const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema
const HandleSchema = new Schema({
  uid: {
    type: String,
    required: true
  },
  photoURL: {
    type: String,
    required: true
  },
  handle: {
    type: String,
    required: true
  },
  name: {
    firstName: {
      type: String,
      required: true
    },
    middleName: {
      type: String
    },
    lastName: {
      type: String,
      required: true
    },
    fullName: {
      type: String
    }
  }
});

module.exports = Handle = mongoose.model('handle', HandleSchema);
