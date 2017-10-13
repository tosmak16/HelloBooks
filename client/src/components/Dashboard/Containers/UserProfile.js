import React from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import $ from 'jquery';

import getUserdetails from '../../../actions/getUserDetails';
import DashboardSidebar from '../DashboardSidebar';
import UserProfile from '../UserProfile';
import updateUser from '../../../actions/updateuserDetails';
import { uploadAvatar } from '../../../actions/uploadUserAvatar';
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
      // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
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
            <UserProfile
              data={ this.props.userData } item={ this.props.userItem }
              error={ this.props.userDataError } updateUser={ this.props.updateUser }
            />
          </div>
        </div>
      </div>
    );
  }
}

DashboardPage.propTypes = {
  error: PropTypes.string.isRequired,
  getUserdetails: PropTypes.func.isRequired,
  imageUrl: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  updateUser: PropTypes.func.isRequired,
  uploadAvatar: PropTypes.func.isRequired,
  userData: PropTypes.array.isRequired,
  userDataError: PropTypes.string.isRequired,
  userItem: PropTypes.array.isRequired,


};

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
})(DashboardPage);
