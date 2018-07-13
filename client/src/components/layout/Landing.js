import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { authUser } from '../../redux-mod/actions/authActions';

class Landing extends Component {
  render() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }

    // For creating some space for the display
    const blankSpace = {
      padding: '5%'
    };
    return (
      <div>
        <div className="landing">
          <div className="dark-overlay landing-inner text-light">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center">
                  <h1 className="display-3 mb-4">Adventuresome.in</h1>
                  <p className="lead"> Create your adventuresome.in account</p>
                  <p className="lead"> Travel</p>
                  <p className="lead"> Writer your story</p>
                  <hr />
                  <Link
                    to="/signin"
                    className="btn btn-lg btn-info mr-2"
                    refresh="true"
                  >
                    Sign In
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.PropTypes = {
  authUser: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { authUser }
)(Landing);
