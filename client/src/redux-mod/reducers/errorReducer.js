import { GET_ERRORS } from '../actions/types';

import { PURGE } from 'redux-persist';

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    case PURGE:
      console.log('PURGIN!!!');
      return initialState;
    default:
      return state;
  }
}
