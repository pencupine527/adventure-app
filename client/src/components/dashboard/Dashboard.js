import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getCurrentProfile } from '../../redux-mod/actions/profileActions';
import store from '../../store';

import Spinner from '../common/Spinner';
import ContentDisplay from './ContentDisplay';
import { GET_ERRORS } from '../../redux-mod/actions/types';

class Dashboard extends Component {
  componentWillMount() {
    this.props.getCurrentProfile();
    store.dispatch({
      type: GET_ERRORS,
      payload: {}
    });
  }

  render() {
    // For creating some space for the display
    const blankSpace = {
      padding: '10%'
    };

    //console.log(checkAuth());

    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = (
        <h4 className="mx-auto">
          <Spinner />
        </h4>
      );
    } else {
      // Check If Login User has profile Data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <ContentDisplay />
          </div>
        );
      } else {
        // User is logged in but no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Wellcome {user.data.displayName} </p>
            <p>Create your profile!!!</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="register">
        <div style={{ padding: '2%' }} />

        <div className="container">
          <div className="row">
            <div className="col-md-8 ">
              <h2
                className="display-4 text-center"
                style={{ paddingBottom: '10px' }}
              >
                Dashboard
              </h2>
              {dashboardContent}
            </div>
          </div>
        </div>
        <div style={{ padding: '2%' }} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard);
