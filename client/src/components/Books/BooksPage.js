import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import BooksPhoto from './BooksPhoto';
import SideBar from '../SideBar';
import BooksFilter from './BooksFilter';
import getbooks from '../../actions/getBooks';
import BooksCollection from './BooksCollection';
import BooksCategory from './BooksCategory';
import searchbooks from '../../actions/searchbooks';
import checkBookDetails from '../../actions/checkBookDetails';
import showbooksByCategory from '../../actions/showbooksByCategory';


export class BooksPage extends React.Component {
  componentWillMount() {
    if (!this.props.isFetched) {
      this.props.getbooks(false);
    }


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


  render() {
    return (
      <div className="">
        <div className="row">
          <div className="">
            <SideBar data={ this.props.data } showbooksByCategory={ this.props.showbooksByCategory } />
          </div>
          <div id="book_body" className="">
            <div className="row">
              {this.props.isFetched && <BooksFilter checkBookDetails={ this.props.checkBookDetails } searchbooks={ this.props.searchbooks } filteredData={ this.props.filteredData } data={ this.props.data } />}
              {this.props.isFetched && <BooksCategory checkBookDetails={ this.props.checkBookDetails } data={ this.props.categoryData } />}
              {this.props.isFetched && <BooksPhoto checkBookDetails={ this.props.checkBookDetails } data={ this.props.data } />}
              {this.props.isFetched && <BooksCollection checkBookDetails={ this.props.checkBookDetails } heading={ 'Available books' } data={ this.props.data } />}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

BooksPage.propTypes = {
  categoryData: PropTypes.array.isRequired,
  checkBookDetails: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  filteredData: PropTypes.array.isRequired,
  getbooks: PropTypes.func.isRequired,
  isFetched: PropTypes.bool.isRequired,
  searchbooks: PropTypes.func.isRequired,
  showbooksByCategory: PropTypes.func.isRequired

};


function mapStateToProps(state) {
  return {
    isFetched: state.books[0].isFetched,
    data: state.books[0].data,
    categoryData: state.category,
    filteredData: state.getFilteredBooks[0].filteredData,

  };
}

export default connect(mapStateToProps, {
  getbooks,
  searchbooks,
  checkBookDetails,
  showbooksByCategory
})(BooksPage);
