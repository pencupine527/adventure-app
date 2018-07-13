const express = require('express');
const admin = require('firebase-admin');

const auth = express();

module.exports = (req, res, next) => {
  var idToken = req.headers.authorization;
  //console.log(idToken);
  admin
    .auth()
    .verifyIdToken(idToken)
    .then(function(decodedToken) {
      console.log('Token user : ', decodedToken.uid);
      console.log('Token email : ', decodedToken.email);
      req.decodedToken = decodedToken;
      next();
    })
    .catch(function(error) {
      res.json({
        error: 'UNAUTHORIZED'
      });
    });
};
