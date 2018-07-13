import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile } from '../../redux-mod/actions/profileActions';
import isEmpty from '../common/is-empty';

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      firstName: '',
      middleName: '',
      lastName: '',
      handle: '',
      photoURL: '',
      dob: '',
      gender: '',
      phoneNumber: '',
      bio: '',
      address: '',
      instagram: '',
      youtube: '',
      twitter: '',
      facebook: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const { profile } = this.props.profile;
    if (Object.keys(profile).length > 0) {
      window.location.href = '/dashboard';
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    const { user } = this.props.auth;
    e.preventDefault();

    console.log(this.state.dob);

    const profileData = {
      user: user.data,
      firstName: this.state.firstName,
      middleName: this.state.middleName,
      lastName: this.state.lastName,
      handle: this.state.handle,
      photoURL: isEmpty(this.state.photoURL)
        ? this.props.auth.user.data.photoURL
        : this.state.photoURL,
      dob: this.state.dob,
      gender: this.state.gender,
      phoneNumber: this.state.phoneNumber,
      bio: this.state.bio,
      address: this.state.address,
      instagram: this.state.instagram,
      youtube: this.state.youtube,
      twitter: this.state.twitter,
      facebook: this.state.facebook
    };

    this.props.createProfile(profileData, this.props.history);
  }

  render() {
    // For creating some space for the display
    const blankSpace = {
      padding: '10%'
    };

    console.log('rendering');
    const { errors, displaySocialInputs } = this.state;
    console.log(errors);
    //const { auth } = this.props;

    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Instagram Page URL"
            name="instagram"
            icon="fab fa-instagram fa-2x"
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />

          <InputGroup
            placeholder="Facebook Page URL"
            name="facebook"
            icon="fab fa-facebook fa-2x"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />

          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fab fa-twitter fa-2x"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />

          <InputGroup
            placeholder="YouTube Channel URL"
            name="youtube"
            icon="fab fa-youtube fa-2x"
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />
        </div>
      );
    }

    // Select options for status
    const genderOptions = [
      { label: '* Select Your Gender', value: 0 },
      { label: 'Male', value: 'M' },
      { label: 'Female', value: 'F' },
      { label: 'Other', value: 'O' }
    ];

    return (
      <div className="create-profile">
        <div style={{ padding: '5%' }} />
        <div className="container">
          <Link to="/dashboard" className="btn btn-light">
            Go Back
          </Link>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <div />
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">
                Let's get some information to make your profile stand out
              </p>
              <small className="d-block pb-3 text-sm">
                * = required fields
              </small>
              <form onSubmit={this.onSubmit}>
                <div className="row">
                  <div className="col-md-7">
                    <TextFieldGroup
                      placeholder="* First Name"
                      name="firstName"
                      value={this.state.firstName}
                      onChange={this.onChange}
                      error={errors.firstName}
                      info="Your first name"
                    />
                    <TextFieldGroup
                      placeholder="Middle Name"
                      name="middleName"
                      value={this.state.middleName}
                      onChange={this.onChange}
                      error={errors.middleName}
                      info="Your middle name"
                    />
                    <TextFieldGroup
                      placeholder="* Last Name"
                      name="lastName"
                      value={this.state.lastName}
                      onChange={this.onChange}
                      error={errors.lastName}
                      info="Your last name"
                    />
                    <TextFieldGroup
                      placeholder="* UniqueID"
                      name="handle"
                      value={this.state.handle}
                      onChange={this.onChange}
                      error={errors.handle}
                      info="Chose a unique ID. You can shared this with your friends to find your profile. This can be changed later."
                    />
                  </div>
                  <div className="row-md-8 m-auto">
                    <div className="">
                      <img
                        src={
                          isEmpty(this.state.photoURL)
                            ? isEmpty(this.props.auth.user)
                              ? ''
                              : this.props.auth.user.data.photoURL
                            : this.state.photoURL
                        }
                        className="img-thumbnail rounded float-left mx-auto"
                        style={{ width: '200px', marginBottom: '15px' }}
                      />
                    </div>
                  </div>
                </div>
                <hr />
                <TextAreaFieldGroup
                  placeholder="Short Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Tell us a little about yourself"
                />
                <div className="row" style={{ marginTop: '5px' }}>
                  <div className="col-md-6">
                    <TextFieldGroup
                      placeholder="* Date of Birth"
                      name="dob"
                      type="date"
                      value={this.state.dob}
                      onChange={this.onChange}
                      error={errors.dob}
                      info="Your date of birth"
                    />
                  </div>
                  <div className="col-md-6">
                    <SelectListGroup
                      placeholder="* Gender"
                      name="gender"
                      value={this.state.gender}
                      onChange={this.onChange}
                      options={genderOptions}
                      error={errors.gender}
                    />
                  </div>
                </div>
                <hr />
                <TextFieldGroup
                  placeholder="Phone Number"
                  name="phoneNumber"
                  value={this.state.phoneNumber}
                  onChange={this.onChange}
                  error={errors.phoneNumber}
                />
                <TextAreaFieldGroup
                  placeholder="Your address"
                  name="address"
                  value={this.state.address}
                  onChange={this.onChange}
                  error={errors.address}
                />

                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }));
                    }}
                    className={classnames('btn btn-light', {
                      active: displaySocialInputs
                    })}
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted"> Optional</span>
                </div>
                {socialInputs}
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
        <div style={blankSpace} />
      </div>
    );
  }
}

CreateProfile.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(CreateProfile));
