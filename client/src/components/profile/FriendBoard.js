import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Profiles from '../profiles/Profiles';

import './FriendBoard.css';

class FriendBoard extends Component {
  render() {
    const { profile, profiles } = this.props.profile;

    return (
      <div>
        <div>
          <div className="nav nav-tabs btn-group" style={{ marginleft: '5px' }}>
            <a
              href="#bloggers"
              data-toggle="tab"
              className="btn btn-light active"
              style={{ borderBottomLeftRadius: '0px' }}
              value="Bloggers"
            >
              Bloggers
            </a>

            <a
              href="#followers"
              data-toggle="tab"
              className="btn btn-light tab-style"
              value="Followers"
            >
              Followers
            </a>

            <a
              href="#following"
              data-toggle="tab"
              className="btn btn-light tab-style"
              style={{ borderBottomRightRadius: '0px' }}
              value="Following"
            >
              Following
            </a>
          </div>

          <div className="tab-content">
            <div className="tab-pane active" id="bloggers">
              <div className="scrollit">
                <Profiles profiles={profiles} />
              </div>
            </div>
            <div className="tab-pane" id="followers">
              Followers
            </div>
            <div className="tab-pane" id="following">
              Following
            </div>
          </div>
        </div>
      </div>
    );
  }
}

FriendBoard.PropTypes = {
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps)(FriendBoard);
