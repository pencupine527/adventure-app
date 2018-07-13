const express = require('express');
const admin = require('firebase-admin');

// Auth Checker
const authCheck = require('../../auth-modules/authCheck');

// Load Input Validators
const validateRegisterInput = require('../../validation/register');

const keys = require('../../config/keys');

const router = express.Router();

// Load User model
const User = require('../../models/User');

// Firestore database
const db = admin.firestore();

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => {
  res.json({ msg: 'Users Works!!!' });
});
//-----------------------X

//
//
//
//
//

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
  console.log('NewRregisterRequest');
  // Search for user
  User.findOne({ uid: req.body.uid }).then(user => {
    if (user) {
      console.log('user exists in Mongo');
      // USER ALREADY EXISTS JUST SEND BACK INFO
      res.json({
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        profileType: user.profileType
      });
    } else {
      console.log('User is not in mongo');
      // USER DOES NOT EXISTS. SO, REGISTER USER
      // But first lets do a small check into firestore too.
      db.collection('users')
        .doc(req.body.uid)
        .get()
        .then(doc => {
          console.log('Registering');
          if (!doc.exists) {
            console.log('user is not in firestore');
            const newUser_fs = {
              uid: req.body.uid,
              email: req.body.email,
              displayName: req.body.displayName,
              photoURL: req.body.photoURL,
              profileType: req.body.profileType
            };

            const newUser = new User(newUser_fs);
            newUser
              .save()
              .then(user => console.log('New User registered in MongoDB'))
              .catch(err => console.log(err));

            db.collection('users')
              .doc(newUser_fs.uid)
              .set(newUser_fs)
              .then(() => {
                console.log('New User registered in Firestore');
                res.json({
                  uid: newUser.uid,
                  displayName: newUser.displayName,
                  email: newUser.email,
                  photoURL: newUser.photoURL,
                  profileType: newUser.profileType
                });
              })
              .catch(err => console.log(err));
          }
        });
    }
  });
});
//----------------------------X

//
//
//
//
//

// @route   GET api/users/current
// @desc    Return current User
// @access  Private
router.get('/current', authCheck, (req, res) => {
  var uid = req.decodedToken.uid;

  // Find user and retrieve handle and profile type
  User.findOne({ uid: uid }).then(user => {
    if (user) {
      // Case : Profile exists in mongoDB
      db.collection('users')
        .doc(uid)
        .get()
        .then(doc => {
          if (doc.exists) {
            // Case : Profile exists in firestore
            console.log('Login in with ' + user.email);
            res.json({
              uid: uid,
              displayName: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
              profileType: user.profileType
            });
          }
        });
    } else {
      // Case : Profile does not exists in mongoDB
      res.json({
        handle: null,
        profile: null
      });
    }
  });
});

module.exports = router;
