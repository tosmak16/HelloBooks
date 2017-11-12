import React from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import $ from 'jquery';

import getUserdetails from '../../../actions/getUserDetails';
import DashboardSidebar from '../DashboardSidebar';
import BorrowedbooksTable from '../BorrowedbooksTable';
import refreshPage from '../../../actions/refreshPage';
import getborrowedBooks from '../../../actions/getborrowedBooks';
import getbooks from '../../../actions/getBooks';
import returnbook from '../../../actions/returnBooks';
import getunreturnedBooks from '../../../actions/getunreturnedBooks';
import updateUser from '../../../actions/updateuserDetails';
import { uploadAvatar } from '../../../actions/uploadUserAvatar';
import logout from '../../../actions/logoutAction';


/**
 * @export
 * @class BorrowedBooksPage
 * @extends {React.Component}
 */
export class BorrowedBooksPage extends React.Component {
  /**
   * @function compenentWillReceiveProps
   * @memberof BorrowedBooksPage
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
   * @returns {views} containing some unconnected component
   * @memberof BorrowedBooksPage
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
            <BorrowedbooksTable
              bookData={this.props.bookData}
              unreturnedBooksData={this.props.unreturnedBooksData}
              getbooks={this.props.getbooks}
              getborrowedBooks={this.props.getborrowedBooks}
              isRefreshed={this.props.isRefreshed}
              refreshPage={this.props.refreshPage}
              returnbook={this.props.returnbook}
              getunreturnedBooks={this.props.getunreturnedBooks}
              returnBooksItem={this.props.returnBooksItem}
            />
          </div>
        </div>
      </div>
    );
  }
}

BorrowedBooksPage.propTypes = {
  unreturnedBooksData: PropTypes.arrayOf(PropTypes.any).isRequired,
  bookData: PropTypes.arrayOf(PropTypes.any).isRequired,
  error: PropTypes.string.isRequired,
  getbooks: PropTypes.func.isRequired,
  getborrowedBooks: PropTypes.func.isRequired,
  getunreturnedBooks: PropTypes.func.isRequired,
  getUserdetails: PropTypes.func.isRequired,
  imageUrl: PropTypes.string.isRequired,
  isRefreshed: PropTypes.bool.isRequired,
  returnBooksItem: PropTypes.arrayOf(PropTypes.any).isRequired,
  logout: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  refreshPage: PropTypes.func.isRequired,
  returnbook: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  uploadAvatar: PropTypes.func.isRequired,
  userData: PropTypes.arrayOf(PropTypes.any).isRequired,


};

/**
 * @param {arrayOfObject} state
 * @returns {object} of reducers state
 */
function mapStateToProps(state) {
  return {
    userData: state.UserDetails[0].data,
    isRefreshed: state.refreshPage[0].isRefreshed,
    bookData: state.books[0].data,
    returnBooksItem: state.returnBooks,
    unreturnedBooksData: state.getunreturnedBooks[0].data,
    imageUrl: state.userProfileImage[0].response,
    error: state.updateUser[0].error.toString(),
    message: state.updateUser[0].data.toString(),

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
  logout,
})(BorrowedBooksPage);
