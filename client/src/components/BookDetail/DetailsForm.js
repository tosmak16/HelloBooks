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


class DetailsForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
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
          localStorage.setItem('image', image);
          localStorage.setItem('bookTitle', bookTitle);
          localStorage.setItem('id', id);
          localStorage.setItem('category', category);
          localStorage.setItem('isbn', isbn);
          localStorage.setItem('stocknumber', stocknumber);
          localStorage.setItem('author', author);
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
    }
  }


  componentWillUnmount() {
    if (localStorage.bookId) {
      localStorage.removeItem('bookId');
      localStorage.removeItem('id');
    }
  }

  render() {
    return (
      <div className="container" id="book_details_wrapper">
        <div className="row">
          <div className="col m10  col l10 col s12 ">
            <div className="placeholders  ">
              <div className=" col s12 col m2 col l2 placeholder" id="photo">
                <Card
                  className="small card_holder_details"
                  header={ <CardTitle id="card_box_details" image={ require(`../../../public/img/${localStorage.getItem('image')}`) } /> }
                  actions={ <a style={{ fontSize: '12px' }} href="#">{author}</a> }
                > {<a style={{ fontSize: '15px', color: 'black', fontStyle: 'bold' }} href="#" />}</Card>

              </div>
            </div>
            <div className=" col s10 col m7 col l7">

              <h5 className="page-header">{bookTitle}</h5>
              <hr />
              <h5>Summary</h5>
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
              <span id="sum" className="text-muted">The Time Traveller, a dreamer
                 obsessed with traveling through time, builds himself a time machine and,
                  much to his surprise, travels over 800,000 years into the future. He lands
                  in the year 802701: the world has been transformed by a society living in apparent
                  harmony and bliss, but as the Traveler stays in the future he discovers a hidden
                  barbaric and depraved subterranean class. Wells's transparent commentary on the
                  capitalist society was an instant bestseller and launched the time-travel genre.</span>
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
  };
}

export default connect(mapStateToProps, { checkBookDetails, getbooks, borrowBooks })(DetailsForm);

