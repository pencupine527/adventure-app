const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const path = require('path');

const app = express();

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('Mongoose Connected'))
  .catch(err => console.log(err));

// Firevbase Initialization
/*--------------------------------------------
FIREBASE SET UP
---------------------------------------------*/
// Firebase config key importing
const serviceAccount = require('./config/fs-database-adven-app-firebase-adminsdk-ab1ts-95d1e14fb0.json');

// Firebase Admin SDK Initialization
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://fs-database-adven-app.firebaseio.com'
});

const users = require('./routes/api/users');
const posts = require('./routes/api/posts');
const profiles = require('./routes/api/profiles');
const auth = require('./routes/api/auth');

// Use Routes
app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/profiles', profiles);
app.use('/api/auth', auth);

// Server static assets if in production
if (process.env.MODE_ENV === 'production') {
  // Set Static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Server port value
const port = process.env.PORT || 5000;

// Server listener to port
app.listen(port, () => {
  console.log(`Server is listening to port ${port}`);
});
