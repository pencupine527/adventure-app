import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

class Home extends Component {
  render() {
    const { profile } = this.props.profile;

    return (
      <div>
        <div>
          <div className="container tab-margin">
            <div className="row nav-tabs">
              <div className="col-md-6">
                <Link
                  to="/dashboard"
                  className="text-muted"
                  style={{ textDecoration: 'none' }}
                >
                  <h3 className="lead text-muted">{profile.name.fullName}</h3>
                </Link>
              </div>
              <div className="col-md-6">
                <div>
                  <Link
                    to="/dashboard/followers"
                    className="btn btn-sm btn-light float-right mx-auto"
                  >
                    Followers{' '}
                    <span className="badge badge-secondary m-auto">
                      {profile.followersQ}
                    </span>
                  </Link>
                </div>
                <div>
                  <Link
                    to="/dashboard/following"
                    className="btn btn-sm btn-light float-right mx-auto"
                  >
                    Following{' '}
                    <span className="badge badge-secondary m-auto">
                      {profile.followingQ}
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            <div>
              <div>
                <div>
                  <Route exact path="/dashboard" />
                  <Route path="/dashboard/followers" />
                  <Route path="/dashboard/following" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="card card-body card-lg">
            Here the registerd events and there status are shown
          </div>
          <div className="card card-body card-lg">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets contain
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});
export default connect(mapStateToProps)(Home);
