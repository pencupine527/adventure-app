const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Object
  },
  uid: {
    type: String,
    required: true
  },
  name: {
    fullName: {
      type: String,
      required: true
    },
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
    }
  },
  social: {
    instagram: {
      type: String
    },
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    }
  },
  handle: {
    type: String,
    required: true
  },
  photoURL: {
    type: String
  },
  dob: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String
  },
  bio: {
    type: String
  },
  address: {
    type: String,
    required: true
  },
  followers: [
    {
      displayName: {
        type: String,
        required: true
      },
      uid: {
        type: String,
        required: true
      },
      photoURL: {
        type: String,
        required: true
      }
    }
  ],
  following: [
    {
      displayName: {
        type: String,
        required: true
      },
      uid: {
        type: String,
        required: true
      },
      photoURL: {
        type: String,
        required: true
      }
    }
  ],
  followersQ: {
    type: Number,
    isRequired: true
  },
  followingQ: {
    type: Number,
    isRequired: true
  },
  address: {
    type: String,
    isRequired: true
  },
  posts: [
    {
      pid: {
        type: String,
        isRequired: true
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  },
  profileSettings: {
    allowPhoneNumber: {
      type: Boolean,
      default: true
    },
    allowDob: {
      type: Boolean,
      default: true
    }
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
