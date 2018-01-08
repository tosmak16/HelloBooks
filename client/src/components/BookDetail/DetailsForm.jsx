import React from 'react';
import _ from 'lodash';
import $ from 'jquery';
import PropTypes from 'prop-types';
import ActivityLoader from '../preloader/ActivityLoader';
import { storeBookDetailsTemp } from '../BookDetail/helperFunctions/storeBookDetailsTemp';
import { getStoredBookDetails } from '../BookDetail/helperFunctions/getStoredBookDetails';
import { removeStoredBookDetails } from '../BookDetail/helperFunctions/removeStoredBookDetails';

/**
 * @description Book detail unconnected component
 * 
 * @class DetailsForm
 * 
 * @extends {React.Component}
 */
class DetailsForm extends React.Component {
  /**
   * Creates and initialize an instance of DetailsForm.
   * 
   * @param {object} props
   * 
   * @memberof DetailsForm
   */
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      error: '',
      display: false,
      displayPreloader: 'none',
      filteredData: {},
      bookData: [],
      bookIndex: 0
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleExit = this.handleExit.bind(this);
  }
  /**
   * @memberof DetailsForm
   * 
   * @returns {void}
   */
  componentWillMount() {
    if (!_.isEmpty(localStorage.bookId)) {
      this.props.checkBookDetails(localStorage.bookId);
    }
    if (!_.isEmpty(this.props.book[0])) {
      if (_.isEmpty(localStorage.id)) {
        const { bookData } = this.props;
        const bookId = this.props.book[0].bookId;
        window.localStorage.setItem('bookId', bookId);
        const bookIndex = _.findIndex(bookData, ['id', Number(bookId)]);
        const filteredData = bookData[bookIndex];
        this.setState({
          filteredData,
          bookIndex,
          bookData
        });
      }
    }
    if (this.props.bookData.length === 0) {
      getStoredBookDetails(this.state.filteredData);
    }

    $(document).ready(() => {
      $('.modal').modal();
    });
  }
  /**
  * @memberof DetailsForm
  *
  * @returns {void}
  */
  componentDidMount() {
    storeBookDetailsTemp(this.state.filteredData);
  }

  /**
   * @param {object} nextProps
   * 
   * @memberof DetailsForm
   * 
   * @returns {void}
   */
  componentWillReceiveProps(nextProps) {
    const sortedData = nextProps.borrowBookItem[0];
    this.setState({
      displayPreloader: 'none'
    });
    if (this.state.display) {
      if (!_.isEmpty(sortedData.error) && this.state.display) {
        this.setState({
          error: sortedData.error,
          display: false,
        });
        $('#modal2').modal('open');
      } else if (!_.isEmpty(sortedData.response) && this.state.display) {
        this.state.bookData[this.state.bookIndex].stockNumber -= 1;
        this.setState({
          message: sortedData.response,
          display: false,
        });
        $('#modal3').modal('open');
      }
    }
  }

  /**
   * @memberof DetailsForm
   * 
   * @returns {void}
   */
  componentWillUnmount() {
    removeStoredBookDetails();
  }

  /**
   * @returns {void}
   * 
   * @param {object} event
   * 
   * @memberof DetailsForm
   */
  handleClick(event) {
    event.preventDefault();
    this.setState({
      display: true,
      displayPreloader: 'block'
    });
    this.props.borrowBooks(localStorage.jwtToken, localStorage.bookId);
    $('#modal1').modal('close');
  }

  /**
   * @param {object} event
   * 
   * @memberof DetailsForm
   * 
   * @returns {void}
   */
  handleOpen(event) {
    event.preventDefault();
    this.setState({
      errorFix: true,
    });
    $('#modal1').modal('open');
  }

  /**
   * @param {object} event
   * 
   * @memberof DetailsForm
   * 
   * @returns {void}
   */
  handleClose(event) {
    event.preventDefault();
    $('#modal1').modal('close');
    this.setState({
      errorFix: true,
    });
  }

  /**
   * @param {object} event
   * 
   * @memberof DetailsForm
   * 
   * @returns {void}
   */
  handleExit(event) {
    event.preventDefault();

    $('#modal2').modal('close');
    $('#modal3').modal('close');
    this.setState({
      errorFix: true,
    });
  }

  /**
   * @returns {views} containing book details
   * 
   * @memberof DetailsForm
   */
  render() {
    const displayError = (<div id="modal2" className="modal">
      <div className="modal-content">
        <h5>Oh!</h5>
        <p className="displayErrorMessage" >{this.state.error}</p>
      </div>
      <div className="modal-footer">
        <a
          href=""
          onClick={this.handleExit}
          className="error-modal-close modal-action modal-close waves-effect waves-brown btn-flat"
        >Close</a>
      </div>
    </div>);
    const displaySuccess = (<div id="modal3" className="modal">
      <div className="modal-content">
        <h5>Wow!</h5>
        <p className="displaySuccessMessage">{this.state.message}</p>
      </div>
      <div className="modal-footer">
        <a
          href=""
          onClick={this.handleExit}
          className="success-modal-close modal-action modal-close waves-effect waves-brown btn-flat"
        >Close</a>
      </div>
    </div>);
    return (
      <div className="container" id="book_details_wrapper">
        <div className="row">
          <div className="col m10  col l10 col s12 ">
            <div className="placeholders  ">
              <div className=" col s12 col m2 col l2 placeholder" id="photo">
                <div id="img_body">
                  <img src={this.state.filteredData.image} alt="avatar" style={{ width: '150px', height: '250px' }} />
                </div>
              </div>
            </div>
            <div className=" col s10 col m7 col l7">

              <h5 className="page-header">{this.state.filteredData.bookTitle}</h5>
              <hr />
              <h5>Summary</h5>
              {displayError}
              {displaySuccess}
              <div id="modal1" className="modal">
                <div className="modal-content">
                  <h5>Do you want to add this book to your archives?</h5>
                  <p>{this.state.filteredData.bookTitle}</p>
                </div>
                <div className="modal-footer">
                  <a
                    id="btn-no"
                    href=""
                    onClick={this.handleClose}
                    className="modal-action modal-close waves-effect waves-brown btn-flat"
                  >NO</a>
                  <a
                    id="btn-yes"
                    href=""
                    onClick={this.handleClick}
                    className="modal-action modal-close waves-effect waves-brown btn-flat"
                  >YES</a>
                </div>
              </div>
              <span id="sum" className="text-muted">{this.state.filteredData.summary}</span>
              <div className="">
                <p className="bookinfo">Category: {this.state.filteredData.category} </p>
                <p className="bookinfo">ISBN: {this.state.filteredData.isbn} </p>
                <p className="bookinfo">Number in Stock: {this.state.filteredData.stockNumber} </p>
              </div>
              <div className="form-inline">
                <button
                  onClick={this.handleOpen}
                  id="borrowbtn"
                  type="submit"
                  className="btn-sm btn-success shop"
                >Borrow</button>
              </div>
            </div>

          </div>
        </div>
        <div
          style={{ display: this.state.displayPreloader.toString() }}
          id="activity-loader-id"
          className="activity"
        >
          <ActivityLoader />
        </div>
      </div>
    );
  }
}
DetailsForm.propTypes = {
  book: PropTypes.arrayOf(PropTypes.any).isRequired,
  borrowBooks: PropTypes.func.isRequired,
  checkBookDetails: PropTypes.func.isRequired,
  bookData: PropTypes.arrayOf(PropTypes.any).isRequired,
  borrowBookItem: PropTypes.arrayOf(PropTypes.any).isRequired,
};
export default DetailsForm;

