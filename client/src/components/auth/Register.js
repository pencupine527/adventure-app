import React, { Component } from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';

import { registerUser } from '../../redux-mod/actions/profileTypeActions';

class Register extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);

    this.state = {
      handle: '',
      profileType: 'adventurer'
      //errors: {}
    };
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.errors) {
  //     this.setState({
  //       errors: nextProps.errors
  //     });
  //   }
  // }

  onChange(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }

  handleRadioButton(value) {
    this.setState({
      profileType: value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const { user } = this.props.auth;

    const userData = {
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      handle: this.state.handle,
      profileType: this.state.profileType
    };

    this.props.registerUser(userData, this.props.history);
  }

  render() {
    // If Registered Go To Dashboard
    if (this.props.profileType.isRegistered) {
      this.props.history.push('/dashboard');
    }

    // Fore creating some space for the display
    const blankSpace = {
      padding: '10%'
    };

    var { errors } = this.props;

    return (
      <div className="register">
        <div style={blankSpace} />
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Register</h1>
              <hr />
              <form>
                <p className="lead text-center">Select your Unique userID</p>
                <TextFieldGroup
                  placeholder="Select an Unique ID"
                  name="handle"
                  type="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                />
                <hr />
                <p className="lead text-center">Select your Membership Type</p>
                <div className="mx-auto text-center">
                  <div className="btn-group" name="profileType">
                    <input
                      className={classnames('btn btn-info btn-lg', {
                        active: this.state.profileType === 'adventurer'
                      })}
                      type="button"
                      value="Adventurer"
                      onClick={() => this.handleRadioButton('adventurer')}
                    />
                    <input
                      className={classnames('btn btn-info btn-lg', {
                        active: this.state.profileType === 'partner'
                      })}
                      type="button"
                      value="Partner"
                      onClick={() => this.handleRadioButton('partner')}
                    />{' '}
                  </div>
                </div>
                <hr />
                <div className="row-md-8 mx-auto">
                  <div className="display-4 text-center">
                    <button
                      type="submit"
                      onClick={this.onSubmit.bind(this)}
                      className="btn btn-lg btn-light"
                    >
                      <span className="col">Register</span>
                    </button>
                  </div>
                </div>
              </form>{' '}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.PropTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  profileType: PropTypes.object.isRequired
};

const mapPropsToStates = state => ({
  auth: state.auth,
  errors: state.errors,
  profileType: state.profileType
});

export default connect(
  mapPropsToStates,
  { registerUser }
)(withRouter(Register));
