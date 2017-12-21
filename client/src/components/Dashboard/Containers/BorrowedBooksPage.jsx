import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import $ from 'jquery';

import getUserdetails from '../../../actions/getUserDetails';
import DashboardSidebar from '../DashboardSidebar';
import { BorrowedbooksTable } from '../BorrowedbooksTable';
import refreshPage from '../../../actions/refreshPage';
import getborrowedBooks from '../../../actions/getborrowedBooks';
import getbooks from '../../../actions/getBooks';
import returnbook from '../../../actions/returnBooks';
import getunreturnedBooks from '../../../actions/getunreturnedBooks';
import updateUser from '../../../actions/updateuserDetails';
import { uploadAvatar } from '../../../actions/uploadUserAvatar';
import { logout } from '../../../actions/logoutAction';

/**
 * @export
 * @class BorrowedBooksPage
 * @extends {React.Component}
 */
export class BorrowedBooksPage extends React.Component {
  /**
   * Creates an instance of BorrowedbooksTable.
   * @param {object} props
   * @memberof BorrowedbooksTable
   */
  constructor(props) {
    super(props);
    this.state = {
      Id: '',
      bookId: '',
      error: '',
      pointer: false,
      errors: '',
      message: '',
      bookLoaded: false,
      pdfUrl: '',
      displayPreloader: 'none'
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleYes = this.handleYes.bind(this);
    this.handleNo = this.handleNo.bind(this);
    this.handleExit = this.handleExit.bind(this);
    this.handleRead = this.handleRead.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  /** 
   * @memberof BorrowedBooksPage
   * @returns {void}
   */
  componentDidMount() {
    if (_.isEmpty(this.props.userData)) {
      this.props.getUserdetails(localStorage.jwtToken);
    }
    $(document).ready(() => {
      $('.modal').modal();
    });
    if (_.isEmpty(this.props.unreturnedBooksData)) {
      this.props.getunreturnedBooks(localStorage.jwtToken);
    }

    if (_.isEmpty(this.props.bookData)) {
      this.props.getbooks(true);
    }
  }
  /**
   * @param {object} nextProps
   * @memberof BorrowedbooksTable
   * @returns {void}
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      displayPreloader: 'none'
    });
    const sortedData = nextProps.returnBooksItem[0];

    if (this.state.pointer) {
      if (!_.isEmpty(sortedData.error) && this.state.pointer) {
        $('#modal2').modal('open');
        this.setState({
          pointer: false,
          errors: sortedData.error,
        });
      } else if (!_.isEmpty(sortedData.response) && this.state.pointer) {
        $('#modal3').modal('open');
        this.setState({
          pointer: false,
          message: sortedData.response,
        });
      }
    }
    if (nextProps.isRefreshed) {
      this.props.refreshPage(false);
      this.props.getunreturnedBooks(localStorage.jwtToken);
      this.props.getborrowedBooks(localStorage.jwtToken);
    }
  }
  /**
 * @param {object} event
 * @memberof BorrowedbooksTable
 * @returns{void}
 */
  handleClick(event) {
    const selectedBook = event.target.name;
    const selectedBookIndex = selectedBook.slice(0, selectedBook.search(','));
    const bookId = selectedBook.slice(selectedBook.search(',') + 1);
    this.setState({
      bookId,
      Id: selectedBookIndex,
    });
    $('#modal1').modal('open');
  }
  /**
   * @param {object} event
   * @memberof BorrowedbooksTable
   * @returns{void}
   */
  handleExit(event) {
    event.preventDefault();
    $('#modal2').modal('close');
    $('#modal3').modal('close');
    this.props.refreshPage(true);
  }
  /**
   * @param {object} event
   * @memberof BorrowedbooksTable
   * @returns{void}
   */
  handleYes(event) {
    event.preventDefault();
    this.props.returnbook(this.state, localStorage.jwtToken);
    this.setState({
      displayPreloader: 'block',
      pointer: true,
    });
    $('#modal1').modal('close');
  }
  /**
   * @param {object} event
   * @memberof BorrowedbooksTable
   * @returns{void}
   */
  handleNo(event) {
    event.preventDefault();
    $('#modal1').modal('close');
    this.setState({
      pointer: true,
    });
  }
  /**
   * @param {object} event
   * @memberof BorrowedbooksTable
   * @returns{void}
   */
  handleRead(event) {
    event.preventDefault();
    const selectedBook = event.target.name;
    const bookId = selectedBook.slice(selectedBook.search(',') + 1);
    const bookData = _.filter(this.props.bookData, book => book.id.toString() === bookId);
    this.setState({
      bookLoaded: true,
      pointer: true,
      pdfUrl: bookData[0].bookFile
    });
    $('#pdf_reader').show();
  }
  /**
   * @param {object} event
   * @memberof BorrowedbooksTable
   * @returns {void}
   */
  handleClose(event) {
    event.preventDefault();
    this.setState({
      bookLoaded: false,
      pointer: true,
    });
    $('#pdf_reader').hide();
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
              handleClick={this.handleClick}
              handleRead={this.handleRead}
              handleClose={this.handleClose}
              handleExit={this.handleExit}
              handleNo={this.handleNo}
              handleYes={this.handleYes}
              state={this.state}
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
