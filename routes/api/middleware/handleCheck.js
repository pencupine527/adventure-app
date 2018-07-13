const express = require('express');

const auth = express();
const Validator = require('validator');

const isEmpty = require('../../../validation/is-empty');
const Handle = require('../../../models/Handle');

// Validator
const validateHandleInput = data => {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : '';
  data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
  data.lastName = !isEmpty(data.lastName) ? data.lastName : '';

  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = 'First Name field is required';
  }

  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = 'Last Name field is required';
  }

  if (!Validator.isLength(data.handle, { min: 5, max: 30 })) {
    errors.handle = 'Your Unique ID needs to be between 5 and 40 characters';
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = 'Your profile needs a unique ID that you can share';
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};

module.exports = (req, res, next) => {
  console.log(req.body.handle);
  console.log(req.body);

  const { errors, isValid } = validateHandleInput(req.body);

  var uid = req.decodedToken.uid;
  // Check Validation
  if (!isValid) {
    console.log('handle inputs error');
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

  // Check for handle and update if there is no similar handle
  Handle.findOne({ handle: req.body.handle })
    .then(userhandle => {
      console.log('running handle test');
      if (userhandle) {
        console.log('found a user with the same handle');
        console.log(userhandle.uid, ' ', req.body.user.uid);
        if (userhandle.uid === req.body.user.uid) {
          console.log('Handle is okay');
          // Update rest of the parameters-------
          var userHandle = {
            handle: req.body.handle,
            uid: req.body.user.uid,
            photoURL: req.body.photoURL,
            name: {}
          };
          if (req.body.firstName)
            userHandle.name.firstName = req.body.firstName;
          if (req.body.middleName)
            userHandle.name.middleName = req.body.middleName;
          if (req.body.lastName) userHandle.name.lastName = req.body.lastName;
          // Creating the full name
          const midName = req.body.middleName ? req.body.middleName + ' ' : '';
          userHandle.name.fullName =
            userHandle.name.firstName +
            ' ' +
            midName +
            userHandle.name.lastName;

          Handle.findOneAndUpdate(
            { uid: req.body.user.uid },
            { $set: userHandle },
            { new: true }
          )
            .then(userhandle => {
              console.log('Updating Handle: ', userhandle);
              next();
            })
            .catch(err => console.log(err));
        } else {
          errors.handle =
            'Unique ID not available. Please choose another unique ID';
          return res.status(404).json(errors);
        }
      } else {
        console.log(
          'No user found with the username. Safe to update or create handle.'
        );
        Handle.findOne({ uid: req.body.user.uid })
          .then(user => {
            var userHandle = {
              handle: req.body.handle,
              uid: req.body.user.uid,
              photoURL: req.body.photoURL,
              name: {}
            };
            if (req.body.firstName)
              userHandle.name.firstName = req.body.firstName;
            if (req.body.middleName)
              userHandle.name.middleName = req.body.middleName;
            if (req.body.lastName) userHandle.name.lastName = req.body.lastName;
            // Creating the full name
            const midName = req.body.middleName
              ? req.body.middleName + ' '
              : '';
            userHandle.name.fullName =
              userHandle.name.firstName +
              ' ' +
              midName +
              userHandle.name.lastName;

            if (user) {
              console.log('updating existing user');
              Handle.findOneAndUpdate({ uid: req.body.user.uid }, userHandle, {
                new: true
              })
                .then(userhandle => {
                  console.log('Updating Handle now: ', userhandle);
                  next();
                })
                .catch(err => console.log(err));
            } else {
              console.log('will store: ', userHandle);
              new Handle(userHandle)
                .save()
                .then(userhandle => {
                  console.log('New Handle : ', userhandle);
                  next();
                })
                .catch(err => console.log(err));
            }
          })
          .catch(err => console.log(err));
      }
    })
    .catch(err => console.log(err));
};
