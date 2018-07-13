import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import classnames from 'classnames';
import { CheckboxGroup, Checkbox } from 'react-checkbox-group';

import {
  deleteAccount,
  saveSettings
} from '../../../redux-mod/actions/profileActions';

class Settings extends Component {
  constructor(props) {
    super(props);

    this.deleteAction = this.deleteAction.bind(this);
    this.saveSettings = this.saveSettings.bind(this);

    this.state = {
      settings: [],
      initialSettings: [],
      valuesChanged: false
    };
  }

  componentWillMount() {
    const obj = this.props.profile.profile.profileSettings;

    Object.keys(obj).forEach(key => {
      if (obj[key] === true) {
        const arr = this.state.settings;
        arr.push(key);
        this.setState({
          settings: arr,
          initialSettings: arr
        });
      }
    });
  }

  settingsChanged = newSettings => {
    if (
      JSON.stringify(this.state.initialSettings.sort()) ==
      JSON.stringify(newSettings.sort())
    ) {
      this.setState({
        settings: newSettings,
        valuesChanged: false
      });
    } else {
      this.setState({
        settings: newSettings,
        valuesChanged: true
      });
    }
  };

  findInArrayFunc(value) {
    const foundValue = this.state.settings.find(function(setValue) {
      return setValue === value;
    });
    return foundValue ? true : false;
  }

  saveSettings() {
    const profileSettings = {
      allowPhoneNumber: this.findInArrayFunc('allowPhoneNumber'),
      allowDob: this.findInArrayFunc('allowDob')
    };

    this.setState({
      valuesChanged: false
    });

    this.props.saveSettings(profileSettings);
  }

  deleteAction(e) {
    e.preventDefault();
    console.log('Will delete account');
    this.props.deleteAccount();
  }

  render() {
    const { profile } = this.props.profile;
    const profileSettings = profile.profileSettings;

    return (
      <div>
        <div>
          <div className="container tab-margin">
            <hr />
            <div className="lead" style={{ padding: '10px' }}>
              Profile Display Settings
            </div>
            <div style={{ paddingLeft: '10px' }}>
              <CheckboxGroup
                checkboxDepth={2} // This is needed to optimize the checkbox group
                name="settings"
                value={this.state.settings}
                onChange={this.settingsChanged}
              >
                <label className="form-check">
                  <Checkbox
                    className="form-check-input"
                    value="allowPhoneNumber"
                  />{' '}
                  Show phone number
                </label>
                <label className="form-check">
                  <Checkbox className="form-check-input" value="allowDob" />{' '}
                  Show birthday on my profile page
                </label>
              </CheckboxGroup>
            </div>
            <hr />
            <div className="lead" style={{ padding: '10px' }}>
              Other Settings
            </div>
            <hr />
            <button
              className={classnames('btn btn-outline-info btn-info', {
                disabled: !this.state.valuesChanged
              })}
              onClick={this.saveSettings}
              disabled={!this.state.valuesChanged}
            >
              Save{' '}
            </button>
            <small className="text-muted" style={{ padding: '7.5px' }}>
              {this.state.valuesChanged
                ? 'You have some Unsaved settings. Please save to make changes permanent.'
                : ' '}
            </small>
            <hr />
            <div
              className="btn btn-outline-danger btn-info float-right"
              onClick={this.deleteAction}
            >
              Delete Profile{' '}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { deleteAccount, saveSettings }
)(Settings);
