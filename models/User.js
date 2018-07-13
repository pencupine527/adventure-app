const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema
const UserSchema = new Schema({
  uid: {
    type: String,
    required: true
  },
  handle: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  displayName: {
    type: String,
    required: true
  },
  profileType: {
    type: String
  },
  photoURL: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model('users', UserSchema);
