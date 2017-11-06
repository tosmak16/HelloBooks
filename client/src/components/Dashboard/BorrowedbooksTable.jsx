import React from 'react';
import isEmpty from 'lodash/isEmpty';
import filterBy from 'lodash/filter';
import PropTypes from 'prop-types';
import $ from 'jquery';
import lodash from 'lodash';

import BorrowedbooksTableRow from './BorrowedbooksTableRow';
import DoubleActionModal from '../modal/DoubleActionModal';
import SingleActionModal from '../modal/SingleActionModal';
import PdfReader from '../pdf/PdfReader';
import ActivityLoader from '../preloader/ActivityLoader';


let tablerow = '';
let pdfUrl = '';
let bookLoaded = false;
let displayPreloader = 'none';
let sortedData = '';
/**
 * @class BorrowedbooksTable
 * @extends {React.Component}
 */
export class BorrowedbooksTable extends React.Component {
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
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleYes = this.handleYes.bind(this);
    this.handleNo = this.handleNo.bind(this);
    this.handleExit = this.handleExit.bind(this);
    this.handleRead = this.handleRead.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  /**
   *@returns {void}
   * @memberof BorrowedbooksTable
   */
  componentWillMount() {
    if (isEmpty(this.props.unreturnedBooksData)) {
      this.props.getunreturnedBooks(localStorage.jwtToken);
    }

    if (isEmpty(this.props.bookData)) {
      this.props.getbooks(true);
    }

    $(document).ready(() => {
      $('.modal').modal();
    });
  }
  /**
   * @param {object} nextProps
   * @memberof BorrowedbooksTable
   * @returns {void}
   */
  componentWillReceiveProps(nextProps) {
    displayPreloader = 'none';
    sortedData = nextProps.returnBooksItem[0];

    if (this.state.pointer) {
      if (!isEmpty(sortedData.error) && this.state.pointer) {
        $('#modal2').modal('open');
        this.setState({
          pointer: false,
          errors: sortedData.error,
        });
      } else if (!isEmpty(sortedData.response) && this.state.pointer) {
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
    displayPreloader = 'block';
    this.props.returnbook(this.state, localStorage.jwtToken);
    this.setState({
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
    const bookData = lodash.filter(this.props.bookData, book => book.id.toString() === bookId);
    pdfUrl = bookData[0].bookFile;
    bookLoaded = true;
    this.setState({
      pointer: true,
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
    bookLoaded = false;
    this.setState({
      pointer: true,
    });
    $('#pdf_reader').hide();
  }
  /**
   * @returns {void}
   * @memberof BorrowedbooksTable
   */
  render() {
    if (this.props.unreturnedBooksData) {
      const { unreturnedBooksData } = this.props;
      tablerow = unreturnedBooksData.map(book =>
        (<BorrowedbooksTableRow
          key={book.id}
          book={book}
          value={book.id}
          bookItem={filterBy(this.props.bookData, ['id', book.bookId])}
          onHandleClick={this.handleClick}
          onHandleRead={this.handleRead}
        />));
    }
    return (
      <div id="bb_table" className="row">
        {bookLoaded && <div id="pdf_wrapper" >

          <div id="pdf_reader" >
            {bookLoaded && <PdfReader onHandleClose={this.handleClose} pdfUrl={pdfUrl} />}
          </div>
        </div>
        }
        <div className="  col l10 offset-l2 col m10 offset-m2 col s12">
          <h4 className="sub-header"> Currently Reads</h4>

          <div className="responsive-table">
            <table id="table_bb" className="table responsive-table bordered highlight striped">
              <thead>
                <tr>
                  <th><span className="glyphicon glyphicon-education" /></th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Category</th>
                  <th>ISBN</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {tablerow}
              </tbody>
            </table>
          </div>


          <SingleActionModal
            id={'modal3'}
            heading={'Done!'}
            message={this.state.message ? this.state.message : ''}
            onHandleExit={this.handleExit}
          />
          <SingleActionModal
            id={'modal2'}
            heading={'Oh!'}
            message={this.state.errors ? this.state.errors : ''}
            onHandleExit={this.handleExit}
          />


          <DoubleActionModal
            id={'modal1'}
            onHandleClick={this.handleYes}
            onHandleClose={this.handleNo}
            bookTitle={''}
            heading={'Do you want to return this book?'}
          />
        </div>

        <div
          style={{ display: displayPreloader.toString() }}
          id="activity-loader-id"
          className="activity"
        >
          <ActivityLoader />
        </div>
      </div>
    );
  }
}

BorrowedbooksTable.propTypes = {
  bookData: PropTypes.arrayOf(PropTypes.any).isRequired,
  unreturnedBooksData: PropTypes.arrayOf(PropTypes.any).isRequired,
  getbooks: PropTypes.func.isRequired,
  getborrowedBooks: PropTypes.func.isRequired,
  getunreturnedBooks: PropTypes.func.isRequired,
  isRefreshed: PropTypes.bool.isRequired,
  returnBooksItem: PropTypes.arrayOf(PropTypes.any).isRequired,
  refreshPage: PropTypes.func.isRequired,
  returnbook: PropTypes.func.isRequired,
};


export default BorrowedbooksTable;
