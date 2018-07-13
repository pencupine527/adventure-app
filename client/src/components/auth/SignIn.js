import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { authUser } from '../../redux-mod/actions/authActions';
import { googleSignIn } from '../../authJS';
import { checkPublicRoute } from '../../redux-mod/actions/authActions';
import setAuthToken from '../../utils/setAuthToken';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.signIn = this.signIn.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      //this.props.checkPublicRoute(this.props.history);
      this.props.history.push('/dashboard');
    }
  }

  signIn(e) {
    e.preventDefault();
    this.props.googleSignIn('Adventurer', this.props.history);
  }

  render() {
    // For creating some space for the display
    const blankSpace = {
      padding: '10%'
    };

    return (
      <div className="register">
        <div style={blankSpace} />
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your Adventuresome account
              </p>

              <div className="row-md-8 mx-auto">
                <div className="display-4 text-center">
                  <button
                    type="submit"
                    onClick={this.signIn}
                    className="btn btn-lg btn-light"
                  >
                    <span className="col">
                      <i
                        className="fab fa-google"
                        style={{ width: '16px', height: '20px' }}
                      />
                    </span>
                    <span className="col">Sign Up With Google</span>
                  </button>
                </div>
              </div>

              <div className="row-md-8 mx-auto">
                <div className="display-4 text-center">
                  <button
                    type="submit"
                    onClick={this.signIn}
                    className="btn btn-lg btn-light"
                  >
                    <span className="col">
                      <i
                        className="fab fa-google"
                        style={{ width: '16px', height: '20px' }}
                      />
                    </span>
                    <span className="col">Log In With Google</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={blankSpace} />
      </div>
    );
  }
}

SignIn.PropTypes = {
  checkPublicRoute: PropTypes.func.isRequired,
  googleSignIn: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { googleSignIn, checkPublicRoute }
)(withRouter(SignIn));
