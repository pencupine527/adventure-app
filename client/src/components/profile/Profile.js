import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import FriendBoard from './FriendBoard';

class Profile extends Component {
  render() {
    const { profile } = this.props.profile;
    return (
      <div className="register">
        <div style={{ padding: '1.5%' }} />
        <div className="container-fluid" style={{}}>
          <div className="row" style={{ height: '100%' }}>
            <div
              className="col-md-3"
              style={{
                backgroundColor: '#A3ABB3',
                padding: 'px',
                borderRadius: '4px'
              }}
            >
              <p className="lead text-center">
                Browse and Connect with Other Adventurers{' '}
              </p>
              <FriendBoard />
            </div>
            <div className="col-md-6 ">
              <div style={{ padding: '2%' }} />

              <div className="col-md-12">
                <div className="card card-body card-lg bg-dark mb-3">
                  <div className="row">
                    <div className="col-md-3">
                      <img className="rounded-circle" src={profile.photoURL} />
                    </div>
                    <div className="col-md-8 text-white-50">
                      <h2>{profile.name.fullName}</h2>
                      <p className="lead text-muted">{profile.bio}</p>
                      <div className="row" />
                      <div className="col-md-8">
                        Here the current or recent event this user went to or
                        will go to will be displayed
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card card-body card-lg bg-light">
                  <h3>WORK IN PROGRESS</h3>
                  <p className="lead text-muted">
                    Here Cards of Blog Posts will appear from recent to old with
                    number of comments and likes... On clicking on them you will
                    be directed to the blog page... with comments and likes
                  </p>
                </div>
              </div>
            </div>
            <div
              className="col-md-3"
              style={{
                backgroundColor: '#A3ABB3',
                borderRadius: '4px'
              }}
            >
              MyPosts
            </div>
          </div>
        </div>
        <div style={{ padding: '2%' }} />
      </div>
    );
  }
}

Profile.PropTypes = {
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps)(Profile);
