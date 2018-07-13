const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : '';

  if (!Validator.isLength(data.handle, { min: 6, max: 30 })) {
    errors.handle = 'Unique ID must be atleast 6 characters';
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = 'Unique ID field is required';
  }
  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
