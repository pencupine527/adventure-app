const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

const authCheck = require('../../auth-modules/authCheck');
const handleCheck = require('../api/middleware/handleCheck');

// Load Profile Model
const Profile = require('../../models/Profile');
// Load User Profile
const User = require('../../models/User');
// Load Handle Profile
const Handle = require('../../models/Handle');

// Firestore database
const db = admin.firestore();

// Importing Validator
const validateProfileInput = require('../../validation/profile');

// @route       GET api/profiles/test
// @desc        Tests profiles routes
// @access      Public
router.get('/test', (req, res) => res.json({ msg: 'Profiles Works' }));

//
//
//
//
//
//

// @route   GET api/profiles
// @desc    Get current User's profile
// @access  Private
router.get('/', authCheck, (req, res) => {
  const errors = {};

  const uid = req.decodedToken.uid;

  Profile.findOne({ uid })
    .then(profile => {
      console.log('1 one');
      if (!profile) {
        console.log('2');
        return res.status(400).json({
          profile: 'Not Found'
        });
      }
      res.json(profile);
    })
    .catch(err => {
      console.log('3');

      res.status(404).json(err);
    });
});

//
//
//
//
//

// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private
router.post('/', authCheck, handleCheck, (req, res) => {
  console.log('Profile Request recieved');
  const { errors, isValid } = validateProfileInput(req.body);
  //console.log(req.body);

  var uid = req.decodedToken.uid;
  // Check Validation
  if (!isValid) {
    console.log('erroneous inputs');
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

  // Get fields
  const profileFields = {};
  profileFields.name = {};
  profileFields.social = {};

  profileFields.user = req.body.user;
  profileFields.uid = req.body.user.uid;
  // Name object
  if (req.body.firstName) profileFields.name.firstName = req.body.firstName;
  if (req.body.middleName) profileFields.name.middleName = req.body.middleName;
  if (req.body.lastName) profileFields.name.lastName = req.body.lastName;

  // Creating the full name
  const midName = req.body.middleName ? req.body.middleName + ' ' : '';
  profileFields.name.fullName =
    profileFields.name.firstName + ' ' + midName + profileFields.name.lastName;
  //console.log(profileFields.name.fullName);

  // Other values
  if (req.body.handle) profileFields.handle = req.body.handle;
  if (req.body.photoURL) profileFields.photoURL = req.body.photoURL;
  if (req.body.dob) profileFields.dob = req.body.dob;
  if (req.body.gender) profileFields.gender = req.body.gender;
  if (req.body.phoneNumber) profileFields.phoneNumber = req.body.phoneNumber;
  if (req.body.bio) profileFields.bio = req.body.bio;
  if (req.body.address) profileFields.address = req.body.address;

  // Social
  if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
  if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
  if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
  if (req.body.facebook) profileFields.social.facebook = req.body.facebook;

  console.log(profileFields);
  // Check if there are any errors
  Profile.findOne({ uid: uid }).then(profile => {
    if (profile) {
      // console.log('Will Update:', profile);
      // Update
      Profile.findOneAndUpdate(
        { uid: uid },
        { $set: profileFields },
        { new: true }
      ).then(profile => {
        //console.log('Updating :', profileFields);
        //console.log('To :', profile);
        res.json(profile);
      });
    } else {
      // Create

      // Check if handle exists
      Profile.findOne({ uid: profileFields.uid }).then(profile => {
        if (profile) {
        } else {
          // Set new user values for the rest of the values,
          profileFields.followersQ = 0;
          profileFields.followingQ = 0;
          //console.log(profileFields);
          // Save Profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        }
      });
    }
  });
});
//---------------------------X

//
//
//
//
//

// @route   POST api/profiles/
// @desc    Post new profile Settings
// @access  Private
router.post('/profile_settings', authCheck, (req, res) => {
  console.log('saving new profile settings');
  const uid = req.decodedToken.uid;
  Profile.findOne({ uid: uid })
    .then(profile => {
      console.log('found profile');
      console.log(req.body);
      //const newProfile = profile;
      console.log(profile);
      profile.profileSettings.allowPhoneNumber = req.body.allowPhoneNumber;
      profile.profileSettings.allowDob = req.body.allowDob;
      Profile.findOneAndUpdate(
        { uid: uid },
        { $set: profile },
        { new: true }
      ).then(profileData => {
        console.log('Updated To :', profileData.profileSettings);
        res.json(profileData);
      });
    })
    .catch(err => {
      console.log(err);
      res.status(404).json({
        error: 'Profile Not Found'
      });
    });
});

//---------------------------X

//
//
//
//
//

// @route   DELETE api/profiles
// @desc    Delete user and profile
// @access  Private
router.delete('/', authCheck, (req, res) => {
  console.log('deleting');
  const uid = req.decodedToken.uid;
  Profile.findOneAndRemove({ uid: uid }).then(() => {
    console.log('deleted prfile');
    User.findOneAndRemove({ uid: uid }).then(() => {
      console.log('deleted user from Mongo');
      db.collection('users')
        .doc(uid)
        .delete()
        .then(() => {
          Handle.findOneAndRemove({ uid: uid }).then(() =>
            res.json({ success: true })
          );
        });
    });
  });
});

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get('/all', (req, res) => {
  const errors = {};

  Handle.find()
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = 'There are no profiles';
        return res.status(404).json(errors);
      }

      res.json(profiles);
    })
    .catch(err => res.status(404).json({ profile: 'There are no profiles' }));
});

module.exports = router;
