import { AUTH_USER, LOGOUT_USER } from '../actions/types';

import { PURGE } from 'redux-persist';

import isEmpty from '../../components/common/is-empty';
import { logoutUser } from '../../authJS';

const initialState = {
  isAuthenticated: false,
  user: {},
  profileType: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case PURGE:
      console.log('PURGIN!!!');
      return initialState;
    // case LOGOUT_USER:
    //   localStorage.removeItem('idToken');
    //   logoutUser();
    //   return {
    //     ...state,
    //     isAuthenticated: false,
    //     user: {}
    //   };
    default:
      return state;
  }
}
