import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;
    return (
      <div className="card card-body card-sm bg-secondary mb-3">
        <div className="row">
          <div className="col-md-9">
            <div className="row">
              <div className="col-md-4">
                <img
                  src={profile.photoURL}
                  style={{ width: '40px', height: '40px' }}
                />
              </div>
              <div className="col-md-8 col-8 text-black-50">
                <h5>{profile.name.fullName}</h5>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="boxShadow float-right">
              <Link to={`/profile`} className="btn btn-light">
                <i className="fas fa-chevron-circle-right" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileItem.PropTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;

// className="box"
{
  /* <div>
            <Link to={`/profile`} className="btn btn-light">
              <i className="fas fa-chevron-circle-right" />
            </Link>
          </div> */
}
