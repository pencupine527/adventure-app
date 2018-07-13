import { AUTH_USER, LOGOUT_USER } from './types';
import { logoutUser } from '../../authJS';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import firebase from 'firebase';

// Authorize Firebase User
export const authUser = (userData, history) => dispatch => {
  //loginUser(userData);
  dispatch({
    type: AUTH_USER,
    payload: userData
  });
};

// Check Auth and Decode Token
export const checkAuth = () => dispatch => {
  setAuthToken();
  // Login the user
  axios
    .get('/api/auth')
    .then(res => {
      console.log('Authorized');
      return;
    })
    .catch(err => {
      logoutUser();
    });
};

export const refreshToken = () => dispatch => {
  firebase
    .auth()
    .currentUser.getIdToken(true)
    .then(idToken => {
      console.log('signed Out');
      localStorage.setItem('idToken', idToken);
    })
    .then(() => setAuthToken());

  document.location.href = '/signin';
};

export const checkPublicRoute = () => dispatch => {
  setAuthToken();
  // Login the user
  axios
    .get('/api/auth')
    .then(res => {
      if (res.data.error) {
        if (res.data.error === 'Token expired') {
          console.log('Unauthorized. Token expired status 200');
          localStorage.removeItem('idToken');
          dispatch({
            type: AUTH_USER,
            payload: {}
          });
        } else if (res.data.uid) {
          console.log('Authorized at signin');
          document.location.href = '/dashboard';
        }
      }
    })
    .catch(err => {
      console.log('Unauthorized. Token expired');
      //logoutUser();
    });
};
