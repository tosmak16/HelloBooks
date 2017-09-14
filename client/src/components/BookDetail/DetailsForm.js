import React from 'react';
import { CardTitle, Card } from 'react-materialize';
import { connect } from 'react-redux';
import lodash from 'lodash';
import $ from 'jquery';


import checkBookDetails from '../../actions/checkBookDetails';
import getbooks from '../../actions/getBooks';
import borrowBooks from '../../actions/borrowBooks';


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

class DetailsForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleExit = this.handleExit.bind(this);
  }
  handleClick(e) {
    e.preventDefault();
    this.props.borrowBooks(localStorage.jwtToken, localStorage.bookId);
    document.getElementById('modal1').style.display = 'none';
  }

  handleOpen(e) {
    e.preventDefault();
    document.getElementById('modal1').style.display = 'block';
  }

  handleClose(e) {
    e.preventDefault();
    document.getElementById('modal1').style.display = 'none';
  }

  handleExit(e) {
    e.preventDefault();
    document.getElementById('modal2').style.display = 'none';
    document.getElementById('modal3').style.display = 'none';
  }


  componentWillMount() {
    if (!lodash.isEmpty(localStorage.bookId)) {
      this.props.checkBookDetails(localStorage.bookId);
    }


    if (this.props.counter > -1) {
      if (!lodash.isEmpty(this.props.book[this.props.counter])) {
        if (lodash.isEmpty(localStorage.id)) {
          const { data } = this.props;
          bookId = this.props.book[this.props.counter].bookId;
          localStorage.setItem('bookId', bookId);
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
    }


    if (this.props.data.length == 0) {
      bookTitle = localStorage.getItem('bookTitle');
      id = localStorage.getItem('id');
      category = localStorage.getItem('category');
      isbn = localStorage.getItem('isbn');
      stocknumber = localStorage.getItem('stocknumber');
      author = localStorage.getItem('author');
      summary = localStorage.getItem('summary');
    }
  }


  componentWillUnmount() {
    if (localStorage.bookId) {
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
  }

  componentWillReceiveProps(nextProps) {
    if (!lodash.isEmpty(nextProps.error)) {
      document.getElementById('modal2').style.display = 'block';
    }
    if (!lodash.isEmpty(nextProps.message.toString())) {
      document.getElementById('modal3').style.display = 'block';
    }
  }


  render() {
    const displayError = (<div id="modal2" className="modal">
      <div className="modal-content">
        <h5>Oh!</h5>
        <p>{this.props.error}</p>
      </div>
      <div className="modal-footer">
        <a href="" onClick={ this.handleExit } className="modal-action modal-close waves-effect waves-brown btn-flat">Close</a>
      </div>
    </div>);
    const displaySuccess = (<div id="modal3" className="modal">
      <div className="modal-content">
        <h5>Wow!</h5>
        <p>{this.props.message.toString()}</p>
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
                  header={ <CardTitle id="card_box_details" image={ require(`../../../public/img/${localStorage.getItem('image')}`) } /> }

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

function mapStateToProps(state) {
  return {
    data: state.books.data,
    book: state.selectedbook,
    counter: state.counter.count,
    error: state.borrowBooks.error,
    message: state.borrowBooks.response
  };
}

export default connect(mapStateToProps, { checkBookDetails, getbooks, borrowBooks })(DetailsForm);

