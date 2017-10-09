import React from 'react';
import { CardTitle, Card } from 'react-materialize';
import lodash from 'lodash';
import $ from 'jquery';
import PropTypes from 'prop-types';


let bookId = '';
let filteredData = '';
let bookTitle = '';
let id = '';
let category = '';
let isbn = '';
let stocknumber = 0;
let author = '';
let image = '';
let summary = '';

let sortedData = '';

/**
 * 
 * 
 * @class DetailsForm
 * @extends {React.Component}
 */
class DetailsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      error: '',
      display: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleExit = this.handleExit.bind(this);
  }
  componentWillMount() {
    if (!lodash.isEmpty(localStorage.bookId)) {
      this.props.checkBookDetails(localStorage.bookId);
    }

    if (!lodash.isEmpty(this.props.book[0])) {
      if (lodash.isEmpty(localStorage.id)) {
        const { data } = this.props;
        bookId = this.props.book[0].bookId;
        window.localStorage.setItem('bookId', bookId);


        filteredData = lodash.filter(data, item => item.id == bookId);

        bookTitle = filteredData[0].bookTitle;
        id = filteredData[0].id;
        category = filteredData[0].category;
        isbn = filteredData[0].isbn;
        stocknumber = filteredData[0].stocknumber;
        author = filteredData[0].author;
        image = filteredData[0].image;
        summary = filteredData[0].summary;
        localStorage.setItem('image', image);
        localStorage.setItem('bookTitle', bookTitle);
        localStorage.setItem('id', id);
        localStorage.setItem('category', category);
        localStorage.setItem('isbn', isbn);
        localStorage.setItem('stocknumber', stocknumber);
        localStorage.setItem('author', author);
        localStorage.setItem('summary', summary);
      }
    }


    if (this.props.data.length == 0) {
      bookTitle = localStorage.getItem('bookTitle');
      id = localStorage.getItem('id');
      category = localStorage.getItem('category');
      isbn = localStorage.getItem('isbn');
      stocknumber = localStorage.getItem('stocknumber');
      author = localStorage.getItem('author');
      summary = localStorage.getItem('summary');
      image = localStorage.getItem('image');
    }
  }

  /**
   * 
   * 
   * @param {any} nextProps 
   * @memberof DetailsForm
   */
  componentWillReceiveProps(nextProps) {
    sortedData = nextProps.item[0];


    if (this.state.display) {
      if (!lodash.isEmpty(sortedData.error) && this.state.display) {
        this.setState({
          error: sortedData.error,
          display: false,
        });
        $('#modal2').show();
      } else if (!lodash.isEmpty(sortedData.response) && this.state.display) {
        this.setState({
          message: sortedData.response,
          display: false,
        });
        $('#modal3').show();
      }
    }
  }


  /**
   * 
   * 
   * @memberof DetailsForm
   */
  componentWillUnmount() {
    localStorage.removeItem('bookId');
    localStorage.removeItem('id');

    localStorage.removeItem('category');
    localStorage.removeItem('isbn');
    localStorage.removeItem('stocknumber');
    localStorage.removeItem('author');
    localStorage.removeItem('summary');
    localStorage.removeItem('bookTitle');
    localStorage.removeItem('image');
  }

  /**
   * 
   * 
   * @param {any} e 
   * @memberof DetailsForm
   */
  handleClick(e) {
    e.preventDefault();
    this.setState({
      display: true,
    });
    this.props.borrowBooks(localStorage.jwtToken, localStorage.bookId);
    $('#modal1').hide();
  }

  /**
   * 
   * 
   * @param {any} e 
   * @memberof DetailsForm
   */

  handleOpen(e) {
    e.preventDefault();
    $('#modal1').show();
  }

  /**
   * 
   * 
   * @param {any} e 
   * @memberof DetailsForm
   */
  handleClose(e) {
    e.preventDefault();
    $('#modal1').hide();
  }

  /**
   * 
   * 
   * @param {any} e 
   * @memberof DetailsForm
   */
  handleExit(e) {
    e.preventDefault();

    $('#modal2').hide();
    $('#modal3').hide();
  }


  render() {
    const displayError = (<div id="modal2" className="modal">
      <div className="modal-content">
        <h5>Oh!</h5>
        <p>{this.state.error}</p>
      </div>
      <div className="modal-footer">
        <a href="" onClick={ this.handleExit } className="modal-action modal-close waves-effect waves-brown btn-flat">Close</a>
      </div>
    </div>);
    const displaySuccess = (<div id="modal3" className="modal">
      <div className="modal-content">
        <h5>Wow!</h5>
        <p>{this.state.message}</p>
      </div>
      <div className="modal-footer">
        <a href="" onClick={ this.handleExit } className="modal-action modal-close waves-effect waves-brown btn-flat">Close</a>
      </div>
    </div>);


    return (
      <div className="container" id="book_details_wrapper">
        <div className="row">
          <div className="col m10  col l10 col s12 ">
            <div className="placeholders  ">
              <div className=" col s12 col m2 col l2 placeholder" id="photo">
                <Card
                  className="small card_holder_details"
                  header={ <CardTitle id="card_box_details" image={ image } /> }

                > {<a style={{ fontSize: '15px', color: 'black', fontStyle: 'bold' }} href="#" />}</Card>

              </div>
            </div>
            <div className=" col s10 col m7 col l7">

              <h5 className="page-header">{bookTitle}</h5>
              <hr />
              <h5>Summary</h5>
              {displayError}
              {displaySuccess}
              <div id="modal1" className="modal">
                <div className="modal-content">
                  <h5>Do you want to add this book to your archives?</h5>
                  <p>{bookTitle}</p>
                </div>
                <div className="modal-footer">
                  <a href="" onClick={ this.handleClose } className="modal-action modal-close waves-effect waves-brown btn-flat">NO</a>
                  <a href="" onClick={ this.handleClick } className="modal-action modal-close waves-effect waves-brown btn-flat">YES</a>
                </div>
              </div>
              <span id="sum" className="text-muted">{summary}</span>
              <div className="">
                <p className="bookinfo">Category: {category} </p>
                <p className="bookinfo">ISBN: {isbn} </p>
                <p className="bookinfo">Number in Stock: {stocknumber} </p>
              </div>
              <div className="form-inline">
                <button id="wishbtn" type="button" className="btn-sm btn-warning shop modal-trigger" href="#modal1">Wishlist</button>
                <button onClick={ this.handleOpen } id="borrowbtn" type="submit" className="btn-sm btn-success shop">Borrow</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

DetailsForm.propTypes = {
  book: PropTypes.array.isRequired,
  borrowBooks: PropTypes.func.isRequired,
  checkBookDetails: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  item: PropTypes.array.isRequired,
};


export default DetailsForm;

