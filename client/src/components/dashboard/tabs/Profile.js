import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import formatDate from '../../common/formatDate';
import isEmpty from '../../common/is-empty';
import { connect } from 'react-redux';

class Profile extends Component {
  render() {
    const { profile } = this.props.profile;

    return (
      <div>
        <div>
          <div className="container tab-margin">
            <div>
              <div>
                <Link
                  to="/edit-profile"
                  className="btn btn-outline-secondary" /*style={{ color: 'black' }}*/
                >
                  <i className="fas fa-edit" title="edit" /> Edit Profile
                </Link>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-4">
                  <img
                    src={profile.photoURL}
                    alt={profile.name.fullName}
                    className="img-rounded img-responsive"
                  />
                </div>
                <div className="col-sm-8">
                  <div className="lead text-muted details-style">
                    <i className="fas fa-user details-icon" />
                    {profile.name.fullName}
                  </div>
                  <div className="lead text-muted details-style">
                    <i className="fas fa-envelope details-icon" />
                    {profile.user.email}
                  </div>
                  <div className="lead text-muted details-style">
                    <i className="fas fa-id-card details-icon" />
                    {profile.handle}
                  </div>
                </div>
              </div>
              <hr />
              <div>
                <div className="lead text-muted details-style">
                  <i className="fas fa-grin details-icon" />
                  <div>{profile.bio}</div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 lead text-muted details-style">
                  <i className="fas fa-birthday-cake details-icon" />
                  {formatDate(profile.dob)}
                </div>
                <div className="col-md-6 lead text-muted details-style">
                  {profile.gender === 'M' ? (
                    <i className="fas fa-mars details-icon" />
                  ) : profile.gender === 'F' ? (
                    <i className="fas fa-venus details-icon" />
                  ) : (
                    <i className="fas fa-genderless details-icon" />
                  )}
                  {profile.gender === 'M'
                    ? 'Male'
                    : profile.gender === 'F'
                      ? 'Female'
                      : 'Gender: Other'}
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-md-6 lead text-muted details-style">
                  <i className="fas fa-phone details-icon" />
                  {!isEmpty(profile.phoneNumber) ? (
                    <div> {profile.phoneNumber}</div>
                  ) : (
                    <div>No Phone Number</div>
                  )}
                </div>
                <div className="col-md-6 lead text-muted details-style">
                  <i className="fas fa-home details-icon" />
                  <div> {profile.address}</div>
                </div>
              </div>
              <hr />
              <div>
                <Link
                  to="/edit-profile"
                  className="btn btn-outline-secondary" /*style={{ color: 'black' }}*/
                >
                  <i className="fas fa-edit" title="edit" /> Edit Profile
                </Link>
              </div>
              <hr />
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

export default connect(mapStateToProps)(Profile);
