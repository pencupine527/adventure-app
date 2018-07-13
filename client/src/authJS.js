import firebase from 'firebase';
import setAuthToken from './utils/setAuthToken';
import axios from 'axios';
import { AUTH_USER } from './redux-mod/actions/types';
import store from './store';

import { PURGE } from 'redux-persist';

export const googleSignIn = profileType => dispatch => {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(userInfo => {
      // User Info
      const userDetails = {
        uid: userInfo.user.uid,
        displayName: userInfo.user.displayName,
        email: userInfo.user.email,
        profileType: profileType,
        photoURL: userInfo.user.photoURL
      };

      axios
        .post('/api/users/register', userDetails)
        .then(user => {
          console.log(user);
          firebase
            .auth()
            .currentUser.getIdToken()
            .then(idToken => {
              console.log('Signed In with token: ' + idToken);
              localStorage.setItem('idToken', idToken);
            })
            // .then
            .then(() => {
              store.dispatch({
                type: AUTH_USER,
                payload: user
              });
            });
          window.location.href = '/dashboard';
          //   .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    });
};

export const logoutUser = () => dispatch => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log('signed Out');
      localStorage.removeItem('idToken');
    })
    .then(() => {
      dispatch({
        type: PURGE,
        payload: {}
      });
    })
    .then(() => {
      document.location.href = '/signin';
    });
};
