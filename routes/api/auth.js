const express = require('express');
const admin = require('firebase-admin');
const router = express.Router();
const mongoose = require('mongoose');

// @route   GET api/auth/test
// @desc    Tests auth route
// @access  Public
router.get('/test', (req, res) => {
  res.json({ msg: 'Auth Works!!!' });
});

// @route   GET api/auth
// @desc    Tests authorization
// @access  Private
router.get('/', (req, res) => {
  var idToken = req.headers.authorization;
  if (idToken === undefined) {
    console.log('No idToken Found');
    res.status(400).json({
      error: 'UNAUTHORIZED. No idToken.'
    });
    return null;
  }
  admin
    .auth()
    .verifyIdToken(idToken)
    .then(decodedToken => {
      // When token valid this block is run
      User.findOne({ uid: decodedToken.uid }).then(user => {
        console.log('Checking auth for user : ', decodedToken.uid);
        res.json({
          uid: decodedToken.uid,
          email: decodedToken.email,
          displayName: decodedToken.name,
          photoURL: user.photoURL,
          profileType: user.profileType
        });
      });
      //------------------------------------------------
      // // For checking stage. To invoke 'token expired'
      // res.json({
      //   error: 'Token expired'
      // });
    })
    .catch(err => {
      console.log('Token expired');
      res.json({
        error: 'Token expired'
      });
    });
});

module.exports = router;
