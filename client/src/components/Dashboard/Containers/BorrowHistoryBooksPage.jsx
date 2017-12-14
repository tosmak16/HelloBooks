import React from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import $ from 'jquery';

import getUserdetails from '../../../actions/getUserDetails';
import DashboardSidebar from '../DashboardSidebar';
import BookHistoryTable from '../BookHistoryTable';
import refreshPage from '../../../actions/refreshPage';
import getborrowedBooks from '../../../actions/getborrowedBooks';
import getbooks from '../../../actions/getBooks';
import updateUser from '../../../actions/updateuserDetails';
import { uploadAvatar } from '../../../actions/uploadUserAvatar';
import logout from '../../../actions/logoutAction';


/**
 * @export
 * @class BorrowHistoryBooksPage
 * @extends {React.Component}
 */
export class BorrowHistoryBooksPage extends React.Component {
  /**
   * @memberof BorrowHistoryBooksPage
   * @returns {void}
   */
  componentDidMount() {
    if (isEmpty(this.props.userData)) {
      this.props.getUserdetails(localStorage.jwtToken);
    }
    $(document).ready(() => {
      $('.modal').modal();
    });
    if (isEmpty(this.props.borrowBooksHistoryDate)) {
      this.props.getborrowedBooks(localStorage.jwtToken);
    }
    if (isEmpty(this.props.bookData)) {
      this.props.getbooks(true);
    }
  }
  /**
  * @returns {void}
  * @param {object} nextProps
  * @memberof BorrowHistoryBooksPage
  */
  componentWillReceiveProps(nextProps) {
    if (nextProps.isRefreshed) {
      this.props.getborrowedBooks(localStorage.jwtToken);
    }
  }
  /**
   * @function render
   * @returns {void}
   * @memberof BorrowHistoryBooksPage
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
            <BookHistoryTable
              bookData={this.props.bookData}
              borrowBooksHistoryDate={this.props.borrowBooksHistoryDate}
              getbooks={this.props.getbooks}
              getborrowedBooks={this.props.getborrowedBooks}
              isRefreshed={this.props.isRefreshed}
              refreshPage={this.props.refreshPage}
            />
          </div>
        </div>
      </div>
    );
  }
}

BorrowHistoryBooksPage.propTypes = {
  borrowBooksHistoryDate: PropTypes.arrayOf(PropTypes.any).isRequired,
  bookData: PropTypes.arrayOf(PropTypes.any).isRequired,
  error: PropTypes.string.isRequired,
  getbooks: PropTypes.func.isRequired,
  getborrowedBooks: PropTypes.func.isRequired,
  getUserdetails: PropTypes.func.isRequired,
  imageUrl: PropTypes.string.isRequired,
  isRefreshed: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  refreshPage: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  uploadAvatar: PropTypes.func.isRequired,
  userData: PropTypes.arrayOf(PropTypes.any).isRequired,
};

/**
 * @param {object} state
 * @returns {object} containing reducers state
 */
function mapStateToProps(state) {
  return {
    userData: state.UserDetails[0].data,
    isRefreshed: state.refreshPage[0].isRefreshed,
    borrowBooksHistoryDate: state.getborrowedBooks[0].data,
    bookData: state.books[0].data,
    imageUrl: state.userProfileImage[0].response,
    error: state.updateUser[0].error.toString(),
    message: state.updateUser[0].data.toString(),
  };
}

export default connect(mapStateToProps, {
  getborrowedBooks,
  getbooks,
  getUserdetails,
  refreshPage,
  updateUser,
  uploadAvatar,
  logout
})(BorrowHistoryBooksPage);
