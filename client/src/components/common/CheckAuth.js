import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import setAuthToken from '../../utils/setAuthToken';
import { connect } from 'react-redux';
import firebase from 'firebase';
import PropTypes from 'prop-types';

import store from '../../store';

import Spinner from './Spinner';

import {
  LOGOUT_USER,
  AUTH_USER,
  GET_PROFILE
} from '../../redux-mod/actions/types';

import { PURGE } from 'redux-persist';

class CheckAuth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      render: <Spinner />
    };
  }

  componentWillMount() {
    setAuthToken();

    if (this.props.auth.isAuthenticated) {
      axios
        .get('/api/auth')
        .then(res => {
          if (res.data.error === 'Token expired') {
            console.log('Unauthorized. Token expired status 200');
            localStorage.removeItem('idToken');
            store.dispatch({
              type: PURGE
            });
            firebase
              .auth()
              .signOut()
              .then(() => {
                console.log('signed Out');
              });
            this.props.clearCurrentProfile();
            this.setState({
              render: <Redirect to="/signin" />
            });
          } else if (res.data.uid) {
            console.log('Authorized. redirecting');
            this.setState({
              render: <div>{this.props.children}</div>
            });
          }
        })
        .catch(err => {
          console.log('Unauthorized');
          window.location.href = '/signin';
        });
    } else {
      window.location.href = '/signin';
    }
  }
  render() {
    return <div>{this.state.render}</div>;
  }
}

CheckAuth.PropTypes = {
  clearCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(CheckAuth);
