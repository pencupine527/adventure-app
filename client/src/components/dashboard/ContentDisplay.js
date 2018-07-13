import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import classnames from 'classnames';
import { connect } from 'react-redux';

import './ContentDisplay.css';

import Home from './tabs/Home';
import Profile from './tabs/Profile';
import Settings from './tabs/Settings';

class ContentDisplay extends Component {
  render() {
    return (
      <div>
        <div>
          <div>
            <div className="nav nav-tabs btn-group">
              <a
                href="#home"
                data-toggle="tab"
                className="btn btn-light active"
                style={{ borderBottomLeftRadius: '0px' }}
                value="Home"
              >
                Home
              </a>

              <a
                href="#profile"
                data-toggle="tab"
                className="btn btn-light tab-style"
                value="Profile"
              >
                Profile
              </a>

              <a
                href="#settings"
                data-toggle="tab"
                className="btn btn-light tab-style"
                style={{ borderBottomRightRadius: '0px' }}
                value="Settings"
              >
                Settings
              </a>
            </div>

            <div className="tab-content">
              <div className="tab-pane active" id="home">
                <Home />
              </div>
              <div className="tab-pane" id="profile">
                <Profile />
              </div>
              <div className="tab-pane" id="settings">
                <Settings />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/*
const mapStateToProps = state => ({
  profile: state.profile
});
*/

export default /*connect(mapStateToProps)(*/ ContentDisplay /*)*/;
