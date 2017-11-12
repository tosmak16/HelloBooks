import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


import BooksPhoto from './BooksPhoto';
import SideBar from '../SideBar';
import BooksFilter from './BooksFilter';
import getbooks from '../../actions/getBooks';
import BooksCollection from './BooksCollection';
import BooksCategory from './BooksCategory';
import searchbooks from '../../actions/searchbooks';
import checkBookDetails from '../../actions/checkBookDetails';
import showbooksByCategory from '../../actions/showbooksByCategory';

/**
 * @export
 * @class BooksPage
 * @extends {React.Component}
 */
export class BooksPage extends React.Component {
  /**
   * @memberof BooksPage
   * @returns {void}
   */
  componentWillMount() {
    if (!this.props.isFetched) {
      this.props.getbooks(false);
    }

    if (localStorage.id) {
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
  /**
   * @returns {views} with siderbar, bookfilter and bookcategory component
   * @memberof BooksPage
   */
  render() {
    return (
      <div className="">
        <div className="row">
          <div className="">
            <SideBar
              bookData={this.props.bookData}
              showbooksByCategory={this.props.showbooksByCategory}
            />
          </div>
          <div id="book_body" className="">
            <div className="row">
              {this.props.isFetched &&
                <BooksFilter
                  checkBookDetails={this.props.checkBookDetails}
                  searchbooks={this.props.searchbooks}
                  filteredData={this.props.filteredData}
                  bookData={this.props.bookData}
                />}
              {this.props.isFetched &&
                <BooksCategory
                  checkBookDetails={this.props.checkBookDetails}
                  categoryData={this.props.categoryData}
                />}
              {this.props.isFetched &&
                <BooksPhoto
                  checkBookDetails={this.props.checkBookDetails}
                  bookData={this.props.bookData}
                />}
              {this.props.isFetched &&
                <BooksCollection checkBookDetails={this.props.checkBookDetails} heading={'Available books'} bookData={this.props.bookData} />}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

BooksPage.propTypes = {
  categoryData: PropTypes.arrayOf(PropTypes.any).isRequired,
  checkBookDetails: PropTypes.func.isRequired,
  bookData: PropTypes.arrayOf(PropTypes.any).isRequired,
  filteredData: PropTypes.arrayOf(PropTypes.any).isRequired,
  getbooks: PropTypes.func.isRequired,
  isFetched: PropTypes.bool.isRequired,
  searchbooks: PropTypes.func.isRequired,
  showbooksByCategory: PropTypes.func.isRequired

};

/**
 * @param {arrrayOfobject} state
 * @returns {objects} of reducer state
 */
function mapStateToProps(state) {
  return {
    isFetched: state.books[0].isFetched,
    bookData: state.books[0].data,
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
