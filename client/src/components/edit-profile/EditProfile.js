import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import classnames from 'classnames';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import {
  createProfile,
  getCurrentProfile
} from '../../redux-mod/actions/profileActions';

import isEmpty from '../common/is-empty';
import formatDate from '../common/formatDate';

import ImageView from './ImageView';
import ImgDropAndCrop from '../common/photoUpload/ImgDropAndCrop';

import './EditProfile.css';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newUnsavedImageURL: '',
      uploadingPhoto: false,
      uploadProgress: 0,
      selectedImage: {},
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    const profile = nextProps.profile.profile;
    console.log(profile.photoURL);
    // If profile field doesn't exist, make empty String
    this.setState({
      firstName: !isEmpty(profile.name.firstName) ? profile.name.firstName : '',
      middleName: !isEmpty(profile.name.middleName)
        ? profile.name.middleName
        : '',
      lastName: !isEmpty(profile.name.lastName) ? profile.name.lastName : '',
      handle: !isEmpty(profile.handle) ? profile.handle : '',
      photoURL: !isEmpty(profile.photoURL) ? profile.photoURL : '',
      bio: !isEmpty(profile.bio) ? profile.bio : '',
      dob: !isEmpty(profile.dob) ? formatDate(profile.dob) : '',
      gender: !isEmpty(profile.gender) ? profile.gender : '',
      phoneNumber: !isEmpty(profile.phoneNumber) ? profile.phoneNumber : '',
      address: !isEmpty(profile.address) ? profile.address : '',
      displaySocialInputs: true
    });

    if (!isEmpty(profile.social)) {
      console.log(profile.social);

      this.setState({
        instagram: !isEmpty(profile.social.instagram)
          ? profile.social.instagram
          : '',
        youtube: !isEmpty(profile.social.youtube) ? profile.social.youtube : '',
        twitter: !isEmpty(profile.social.twitter) ? profile.social.twitter : '',
        facebook: !isEmpty(profile.social.facebook)
          ? profile.social.facebook
          : ''
      });
    }
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onImageUpload(ImageFile) {
    this.setState({
      uploadingPhoto: true
    });

    console.log('Upload Request recieved with ', ImageFile);
    var file = ImageFile;
    var fileName = file.name;
    console.log(fileName);
    var storageRef = firebase.storage().ref('/profileImages/' + fileName);
    var uploadTask = storageRef.put(file);

    uploadTask.on(
      'state_changed',
      snapshot => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = Math.floor(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({
          uploadProgress: progress
        });
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      },
      function(error) {
        // Handle unsuccessful uploads
        console.log(
          "File wasn't uploaded because of the error : ",
          error.message
        );
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          console.log('File available at', downloadURL);
          this.setState({
            uploadingPhoto: false,
            uploadProgress: 0,
            photoURL: downloadURL
          });
        });
      }
    );
  }

  onSubmit(e) {
    const { user } = this.props.auth;
    e.preventDefault();
    console.log('submited');

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
      //coverPhotoURL: this.state.coverPhotoURL,
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
        <div style={{ padding: '2%' }} />
        <div className="container">
          <Link to="/dashboard" className="btn btn-light">
            Go Back
          </Link>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <div />
              <h1 className="display-4 text-center">Edit Profile</h1>
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
                    <div class="">
                      <ImageView
                        classnameEdits="img-thumbnail rounded float-left mx-auto"
                        imageStyle={{
                          width: '200px',
                          marginBottom: '15px'
                        }}
                        alt="Profile Photo"
                        imageURL={
                          isEmpty(this.state.photoURL)
                            ? isEmpty(this.props.auth.user)
                              ? ''
                              : this.props.auth.user.data.photoURL
                            : this.state.photoURL
                        }
                      />
                      <p />
                      <div>
                        <div
                          className="col-md-12 btn btn-outline-info btn-sm"
                          data-toggle="modal"
                          data-target="#uploadModal"
                        >
                          Upload
                        </div>
                        {this.state.uploadingPhoto ? (
                          <div
                            className="progress"
                            style={{ marginTop: '10px' }}
                          >
                            <div
                              className="progress-bar"
                              role="progressbar"
                              aria-valuenow={`${this.state.uploadProgress}`}
                              aria-valuemin="0"
                              aria-valuemax="100"
                            >
                              {this.state.uploadProgress}
                            </div>
                          </div>
                        ) : (
                          <div />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <ImgDropAndCrop
                    image={this.state.photoURL}
                    nameImage={this.props.auth.user.data.uid}
                    imageAspectRatio={1 / 1}
                    unsavedImageURL={this.state.newUnsavedImageURL}
                    onImageUpload={this.onImageUpload.bind(this)}
                  />
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
        <div style={{ padding: '2%' }} />
      </div>
    );
  }
}

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
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
  { createProfile, getCurrentProfile }
)(withRouter(EditProfile));
