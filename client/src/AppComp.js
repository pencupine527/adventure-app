import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import firebase from 'firebase';
import { Provider } from 'react-redux';

import './App.css';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import SignIn from './components/auth/SignIn';
import Dashboard from './components/dashboard/Dashboard';
import Profile from './components/profile/Profile';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';

import CheckAuth from './components/common/CheckAuth';

import store from './store';

//import config from './config/keys';

const config = {
  apiKey: AIzaSyBFgtd7GXypzezDgzpWBWvcrrypVROjoyE,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

// To set up a required pattern in
// firebase.auth().onAuthStateChanged(function(user) {
//   if (user) {
//     store.dispatch({
//       type: AUTH_USER,
//       payload: user
//     });
//   }
// });

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App font-roboto">
            <Navbar />
            <div className="header-extra-space"> </div>
            <Route exact path="/" component={Landing} />
            <div className="">
              <Switch>
                <Route exact path="/signin" component={SignIn} />
              </Switch>
              <Switch>
                <Route exact path="/dashboard">
                  <CheckAuth>
                    <Dashboard />
                  </CheckAuth>
                </Route>
              </Switch>
              <Switch>
                <Route exact path="/create-profile">
                  <CheckAuth>
                    <CreateProfile />
                  </CheckAuth>
                </Route>
              </Switch>
              <Switch>
                <Route exact path="/edit-profile">
                  <CheckAuth>
                    <EditProfile />
                  </CheckAuth>
                </Route>
              </Switch>
              <Switch>
                <Route exact path="/profile">
                  <CheckAuth>
                    <Profile />
                  </CheckAuth>
                </Route>
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
