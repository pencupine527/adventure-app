const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : '';

  if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = 'Post must be between 1o and 300 characters';
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = 'Write something for your friends!!!';
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
