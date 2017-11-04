import React from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import $ from 'jquery';

import getUserdetails from '../../../actions/getUserDetails';
import DashboardSidebar from '../DashboardSidebar';
import ChangePasswordPage from '../ChangePasswordPage';
import updateUser from '../../../actions/updateuserDetails';
import { uploadAvatar } from '../../../actions/uploadUserAvatar';
import changePassword from '../../../actions/changePassword';
import logout from '../../../actions/logoutAction';

/**
 * 
 * 
 * @export
 * @class DashboardPage
 * @extends {React.Component}
 */
export class DashboardPage extends React.Component {
  /**
   * 
   * @function compenentWillReceiveProps
   * @memberof DashboardPage
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
   * 
   * @function render
   * @returns 
   * @memberof DashboardPage
   */
  render() {
    return (
      <div >
        <div className="row">
          <div className="col s12 col m12 col l12">
            <DashboardSidebar
              logout={ this.props.logout }
              error={ this.props.error } imageUrl={ this.props.imageUrl }
              data={ this.props.userData } message={ this.props.message }
              updateUser={ this.props.updateUser } uploadAvatar={ this.props.uploadAvatar }
            />
            <ChangePasswordPage
              item={ this.props.passwordChange }
              changePassword={ this.props.changePassword }
            />
          </div>
        </div>
      </div>
    );
  }
}

DashboardPage.propTypes = {
  changePassword: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  getUserdetails: PropTypes.func.isRequired,
  imageUrl: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  passwordChange: PropTypes.array.isRequired,
  updateUser: PropTypes.func.isRequired,
  uploadAvatar: PropTypes.func.isRequired,
  userData: PropTypes.array.isRequired,

};

/**
 * 
 * 
 * @param {any} state 
 * @returns 
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
})(DashboardPage);
