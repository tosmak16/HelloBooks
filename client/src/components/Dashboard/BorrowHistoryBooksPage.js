import React from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';

import getUserdetails from '../../actions/getUserDetails';
import DashboardSidebar from './DashboardSidebar';
import BorrowedbooksTable from './BorrowedbooksTable';
import BookHistoryTable from './BookHistoryTable';
import UserProfile from './UserProfile';
import ChangePasswordPage from './ChangePasswordPage';
import refreshPage from '../../actions/refreshPage';
import getborrowedBooks from '../../actions/getborrowedBooks';
import getbooks from '../../actions/getBooks';
import returnbook from '../../actions/returnBooks';
import getunreturnedBooks from '../../actions/getunreturnedBooks';
import updateUser from '../../actions/updateuserDetails';
import { uploadAvatar } from '../../actions/uploadUserAvatar';
import changePassword from '../../actions/changePassword';

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
              error={ this.props.error } imageUrl={ this.props.imageUrl }
              data={ this.props.userData } message={ this.props.message }
              updateUser={ this.props.updateUser } uploadAvatar={ this.props.uploadAvatar }
            />
            <BorrowedbooksTable
              bookData={ this.props.bookData } data={ this.props.bbData }
              getbooks={ this.props.getbooks } getborrowedBooks={ this.props.getborrowedBooks }
              isRefreshed={ this.props.isRefreshed } refreshPage={ this.props.refreshPage }
              returnbook={ this.props.returnbook } getunreturnedBooks={ this.props.getunreturnedBooks }
              item={ this.props.item }
            />
            <UserProfile
              data={ this.props.userData } item={ this.props.userItem }
              error={ this.props.userDataError } updateUser={ this.props.updateUser }
            />
            <BookHistoryTable
              bookData={ this.props.bookData } data={ this.props.bhData }
              getbooks={ this.props.getbooks } getborrowedBooks={ this.props.getborrowedBooks }
              isRefreshed={ this.props.isRefreshed } refreshPage={ this.props.refreshPage }
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
  bbData: PropTypes.array.isRequired,
  bhData: PropTypes.array.isRequired,
  bookData: PropTypes.array.isRequired,
  changePassword: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  getbooks: PropTypes.func.isRequired,
  getborrowedBooks: PropTypes.func.isRequired,
  getunreturnedBooks: PropTypes.func.isRequired,
  getUserdetails: PropTypes.func.isRequired,
  imageUrl: PropTypes.string.isRequired,
  isRefreshed: PropTypes.bool.isRequired,
  item: PropTypes.array.isRequired,
  message: PropTypes.string.isRequired,
  passwordChange: PropTypes.array.isRequired,
  refreshPage: PropTypes.func.isRequired,
  returnbook: PropTypes.func.isRequired,
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
    isRefreshed: state.refreshPage[0].isRefreshed,
    bhData: state.getborrowedBooks[0].data,
    bookData: state.books[0].data,
    item: state.returnBooks,
    bbData: state.getunreturnedBooks[0].data,
    userItem: state.updateUser,
    imageUrl: state.userProfileImage[0].response,
    error: state.updateUser[0].error.toString(),
    message: state.updateUser[0].data.toString(),
    passwordChange: state.passwordChange,

  };
}

export default connect(mapStateToProps, {
  getunreturnedBooks,
  returnbook,
  getborrowedBooks,
  getbooks,
  getUserdetails,
  refreshPage,
  updateUser,
  uploadAvatar,
  changePassword,
})(DashboardPage);
