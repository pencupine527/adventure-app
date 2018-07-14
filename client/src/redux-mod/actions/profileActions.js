import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import { logoutUser } from '../../authJS';
import firebase from 'firebase';

import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  AUTH_USER,
  GET_PROFILES
} from './types';

// PORFILE ACTIONS

// Get current profile
export const getCurrentProfile = () => dispatch => {
  setAuthToken();
  dispatch(setProfileLoading());
  axios
    .get('/api/profiles')
    .then(res => {
      console.log(res.data);
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_PROFILE,
        payload: {}
      });
    });
};

// Create Profile
export const createProfile = (profileData, history) => dispatch => {
  console.log('Here');
  setAuthToken();
  axios
    .post('/api/profiles', profileData)
    .then(res => {
      console.log('success');
      history.push('/dashboard');
    })
    .catch(err => {
      console.log('error in creating profile', err);
      if (err.response) {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      }
    });
};

// Set Profile Settings
export const saveSettings = settingsData => dispatch => {
  console.log('Here');
  setAuthToken();
  axios
    .post('/api/profiles/profile_settings', settingsData)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
      console.log('successfully set Data');
      window.location.href = '/dashboard';
    })
    .catch(err => {
      console.log('error in setting settings', err);
    });
};

// Delete account & profile
export const deleteAccount = () => dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    setAuthToken();
    axios
      .delete('/api/profiles')
      .then(res => {
        console.log(res.data);
        dispatch({
          type: GET_PROFILE,
          payload: null
        });
        dispatch({
          type: AUTH_USER,
          payload: {}
        });
      })
      .then(() => {
        firebase
          .auth()
          .signOut()
          .then(() => {
            localStorage.removeItem('idToken');
            document.location.href = '/signin';
          });
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};

// PLEASE DELETE THIS IF NECESSARY
// Get all profiles
export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profiles/all')
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    );
};

// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Clear Current Profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
