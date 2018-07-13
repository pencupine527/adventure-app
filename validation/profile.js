const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
  data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
  data.dob = !isEmpty(data.dob) ? data.dob : '';
  data.gender = !isEmpty(data.gender) ? data.gender : '';
  data.address = !isEmpty(data.address) ? data.address : '';

  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = 'First Name field is required';
  }

  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = 'Last Name field is required';
  }

  if (Validator.isEmpty(data.dob)) {
    errors.dob = 'Date of Birth field is required';
  }

  if (Validator.isEmpty(data.gender)) {
    errors.gender = 'Please select your Gender';
  }

  if (!Validator.isLength(data.bio, { min: 25, max: 160 })) {
    errors.bio = 'Your should be min 25 and max 160 characters';
  }

  if (Validator.isEmpty(data.bio)) {
    errors.bio = 'Bio field is required';
  }

  if (Validator.isEmpty(data.address)) {
    errors.address = 'Please enter your address';
  }

  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = 'Not a valid URL';
    }
  }
  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = 'Not a valid URL';
    }
  }
  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = 'Not a valid URL';
    }
  }
  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = 'Not a valid URL';
    }
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
