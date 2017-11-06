import React from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import $ from 'jquery';

import getUserdetails from '../../../actions/getUserDetails';
import DashboardSidebar from '../DashboardSidebar';
import ChangePasswordForm from '../ChangePasswordForm';
import updateUser from '../../../actions/updateuserDetails';
import { uploadAvatar } from '../../../actions/uploadUserAvatar';
import changePassword from '../../../actions/changePassword';
import logout from '../../../actions/logoutAction';

/**
 * @export
 * @class ChangePasswordPage
 * @extends {React.Component}
 */
export class ChangePasswordPage extends React.Component {
  /**
   * @function compenentWillReceiveProps
   * @memberof ChangePasswordPage
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
   * @returns {void}
   * @memberof ChangePasswordPage
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
            <ChangePasswordForm
              passwordChange={this.props.passwordChange}
              changePassword={this.props.changePassword}
            />
          </div>
        </div>
      </div>
    );
  }
}

ChangePasswordPage.propTypes = {
  changePassword: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  getUserdetails: PropTypes.func.isRequired,
  imageUrl: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  passwordChange: PropTypes.arrayOf(PropTypes.any).isRequired,
  updateUser: PropTypes.func.isRequired,
  uploadAvatar: PropTypes.func.isRequired,
  userData: PropTypes.arrayOf(PropTypes.any).isRequired,

};

/**
 * @param {any} state
 * @returns {void}
 */
function mapStateToProps(state) {
  return {
    userData: state.UserDetails[0].data,
    imageUrl: state.userProfileImage[0].response,
    error: state.updateUser[0].error.toString(),
    message: state.updateUser[0].data.toString(),
    passwordChange: state.passwordChange,

  };
}

export default connect(mapStateToProps, {
  getUserdetails,
  updateUser,
  uploadAvatar,
  changePassword,
  logout
})(ChangePasswordPage);
