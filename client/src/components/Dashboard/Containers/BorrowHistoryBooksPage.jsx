import React from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import $ from 'jquery';

import getUserdetails from '../../../actions/getUser';
import DashboardSidebar from '../DashboardSidebar';
import BookHistoryTable from '../BookHistoryTable';
import refreshPage from '../../../actions/refreshPage';
import getBorrowedBook from '../../../actions/getBorrowedBook';
import { getBooks } from '../../../actions/getBooks';
import updateUser from '../../../actions/updateUser';
import { uploadUserAvatar } from '../../../actions/uploadUserAvatar';
import { logout } from '../../../actions/logout';
import NoResourceComponent from '../../NoResourceComponent';

/**
 * @description it's a connected components that servers all props for Unreturned Books
 * 
 * @export BorrowHistoryBooksPage
 * 
 * @class BorrowHistoryBooksPage
 * 
 * @extends {React.Component}
 */
export class BorrowHistoryBooksPage extends React.Component {
  /**
 * Creates an instance of BorrowHistoryBooksPage.
 * 
 * @param {object} props
 * 
 * @memberof BorrowHistoryBooksPage
 */
  constructor(props) {
    super(props);
    this.state = {
      noBorrowedBookHistory: false
    };
  }
  /**
   * @memberof BorrowHistoryBooksPage
   * 
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
      this.props.getBorrowedBook(localStorage.jwtToken);
    }
    if (isEmpty(this.props.bookData)) {
      this.props.getBooks(true);
    }
  }
  /**
  * @param {object} nextProps
  *
  * @memberof BorrowHistoryBooksPage
  *
  * @returns {void}
  */
  componentWillReceiveProps(nextProps) {
    if (nextProps.isRefreshed) {
      this.props.getBorrowedBook(localStorage.jwtToken);
    }

    if (_.isEmpty(nextProps.borrowBooksHistoryDate)) {
      this.setState({
        noBorrowedBookHistory: true
      });
    } else if (!_.isEmpty(nextProps.borrowBooksHistoryDate)) {
      this.setState({
        noBorrowedBookHistory: false
      });
    }
  }
  /**
   * @function render
   * 
   * @returns {void}
   * 
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
              uploadAvatar={this.props.uploadUserAvatar}
            />
            {!isEmpty(this.props.bookData) &&
              !isEmpty(this.props.borrowBooksHistoryDate) && <BookHistoryTable
                bookData={this.props.bookData}
                borrowBooksHistoryDate={this.props.borrowBooksHistoryDate}
                getbooks={this.props.getBooks}
                getborrowedBooks={this.props.getBorrowedBook}
                isRefreshed={this.props.isRefreshed}
                refreshPage={this.props.refreshPage}
              />}

            {
              this.state.noBorrowedBookHistory
              &&
              <NoResourceComponent />
            }
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
  getBooks: PropTypes.func.isRequired,
  getBorrowedBook: PropTypes.func.isRequired,
  getUserdetails: PropTypes.func.isRequired,
  imageUrl: PropTypes.string.isRequired,
  isRefreshed: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  refreshPage: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  uploadUserAvatar: PropTypes.func.isRequired,
  userData: PropTypes.arrayOf(PropTypes.any).isRequired,
};
/**
 * @param {object} state
 * 
 * @returns {object} containing reducers state
 */
function mapStateToProps(state) {
  return {
    userData: state.userDetail[0].data,
    isRefreshed: state.refreshPage[0].isRefreshed,
    borrowBooksHistoryDate: state.borrowedBooksHistory[0].data,
    bookData: state.books[0].data,
    imageUrl: state.userProfileImage[0].response,
    error: state.updateUser[0].error.toString(),
    message: state.updateUser[0].data.toString(),
  };
}
export default connect(mapStateToProps, {
  getBorrowedBook,
  getBooks,
  getUserdetails,
  refreshPage,
  updateUser,
  uploadUserAvatar,
  logout
})(BorrowHistoryBooksPage);
