import React from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import $ from 'jquery';

import getUserdetails from '../../../actions/getUserDetails';
import DashboardSidebar from '../DashboardSidebar';
import UserProfileForm from '../UserProfileForm';
import updateUser from '../../../actions/updateuserDetails';
import { uploadAvatar } from '../../../actions/uploadUserAvatar';
import logout from '../../../actions/logoutAction';

/**
 * @export
 * @class UserProfile
 * @extends {React.Component}
 */
export class UserProfile extends React.Component {
  /**
   * @function compenentWillReceiveProps
   * @memberof UserProfile
   * @returns {void}
   */
  componentWillMount() {
    if (isEmpty(this.props.userData)) {
      this.props.getUserdetails(localStorage.jwtToken);
    }

    $(document).ready(() => {
      $('.modal').modal();
    });
  }
  /**
   * @function render
   *  @returns {void}
   * @memberof UserProfile
   */
  render() {
    return (
      <div >
        <div className="row">
          <div className="col s12 col m12 col l12">
            <DashboardSidebar
              logout={this.props.logout}
              error={this.props.error}
              imageUrl={this.props.imageUrl}
              userData={this.props.userData}
              message={this.props.message}
              updateUser={this.props.updateUser}
              uploadAvatar={this.props.uploadAvatar}
            />
            <UserProfileForm
              userData={this.props.userData}
              userItem={this.props.userItem}
              updateUser={this.props.updateUser}
            />
          </div>
        </div>
      </div>
    );
  }
}

UserProfile.propTypes = {
  error: PropTypes.string.isRequired,
  getUserdetails: PropTypes.func.isRequired,
  imageUrl: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  updateUser: PropTypes.func.isRequired,
  uploadAvatar: PropTypes.func.isRequired,
  userData: PropTypes.arrayOf(PropTypes.any).isRequired,
  userItem: PropTypes.arrayOf(PropTypes.any).isRequired,
};

/**
 * @param {arrayOfObject} state
 *  @returns {object} of some reducer state
 */
function mapStateToProps(state) {
  return {
    userData: state.UserDetails[0].data,
    userDataError: state.UserDetails[0].error,
    userItem: state.updateUser,
    imageUrl: state.userProfileImage[0].response,
    error: state.updateUser[0].error.toString(),
    message: state.updateUser[0].data.toString(),

  };
}

export default connect(mapStateToProps, {
  getUserdetails,
  updateUser,
  uploadAvatar,
  logout
})(UserProfile);
