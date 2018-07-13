import React, { Component } from 'react';
import { Link /*, withRouter*/ } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { logoutUser } from '../../authJS';

import { clearCurrentProfile } from '../../redux-mod/actions/profileActions';
import isEmpty from '../common/is-empty';

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();

    this.props.clearCurrentProfile();
    this.props.logoutUser();
    console.log('click');
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    const { profile } = this.props.profile;

    const profileLinks = !isEmpty(profile) ? (
      <Link to={`/profile`} className="nav-link">
        {/* <img
          className="rounded-circle"
          src={profile.photoURL}
          alt={profile.name.firstName}
          style={{ width: '25px', marginRight: '5px' }}
          title={profile.name.firstName}
        /> */}
        <i
          className="fas fa-user-circle fa-lg"
          alt={profile.name.firstName}
          title={profile.name.firstName}
        />
      </Link>
    ) : (
      ''
    );

    console.log(profileLinks);

    const navbarLinks = isAuthenticated ? (
      // authorized Links
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">{profileLinks}</li>
        <li>
          <div>
            <Link to="/dashboard" className="nav-link">
              <i className="fas fa-map-pin fa-lg" />
            </Link>
            {/*<div class="arrow-up mx-auto" />*/}
          </div>
        </li>
        <li className="nav-item">
          <a className="nav-link" onClick={this.onLogoutClick.bind(this)}>
            Logout
          </a>
        </li>
      </ul>
    ) : (
      // guestLinks
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/signin">
            Sign In
          </Link>
        </li>
      </ul>
    );

    return (
      <div>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4 fixed-top">
          <div className="container">
            <Link className="navbar-brand" to="/">
              Adventuresome.in
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#mobile-nav"
            >
              <span className="navbar-toggler-icon" />
            </button>

            <div className="collapse navbar-collapse" id="mobile-nav">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="events">
                    {' '}
                    Events
                  </Link>
                </li>
              </ul>

              {navbarLinks}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

Navbar.PropTypes = {
  logoutUser: PropTypes.func.isRequired,
  clearCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { clearCurrentProfile, logoutUser }
)(/*withRouter(*/ Navbar) /*)*/;
