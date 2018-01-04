import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import BooksPhoto from './BooksPhoto';
import SideBar from '../SideBar';
import BooksFilter from './BooksFilter';
import { getBooks } from '../../actions/getBooks';
import BooksCollection from './BooksCollection';
import BooksCategory from './BooksCategory';
import searchBook from '../../actions/searchBook';
import { checkBookDetails } from '../../actions/checkBookDetails';
import displayBooksByCategory from '../../actions/displayBooksByCategory';

/**
 * @export
 * @class BooksPage
 * @extends {React.Component}
 */
export class BooksPage extends React.Component {
  /**
   * Creates an instance of BooksFilter.
   * @param {object} props
   * @memberof BooksPage
   */
  constructor(props) {
    super(props);
    this.state = {
      filterBy: '',
      searchText: '',
      error: '',
      booksCollectionDisplay: false,
      bookIsFound: false,
      sortedData: ''
    };
    this.bookFilterHandleChange = this.bookFilterHandleChange.bind(this);
    this.bookFilterHandleSelected = this.bookFilterHandleSelected.bind(this);
    this.bookCollectionHandleClick = this.bookCollectionHandleClick.bind(this);
  }
  /**
   * @memberof BooksPage
   * @returns {void}
   */
  componentWillMount() {
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
 * @memberof BooksPage
 * @returns {void}
 */
  componentDidMount() {
    if (!this.props.isFetched) {
      this.props.getBooks(false);
    }
  }
  /**
  * @function componentWillReceiveProps
  * @param {object} nextProps
  * @memberof BooksCategory
  * @returns {void}
  */
  componentWillReceiveProps(nextProps) {
    if (nextProps.categoryData[0]) {
      this.setState({
        sortedData: nextProps.categoryData[0]
      });
    }
  }
  /**
  * @description
  * @param {object} event
  * @memberof BooksPage
  * @returns {void}
  */
  bookFilterHandleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    if (this.state.filterBy !== '') {
      this.setState({ error: '', bookIsFound: true });
      if (this.state.filterBy && this.state.searchText && !_.isEmpty(this.props.bookData)) {
        this.props.searchBook(this.state.filterBy, this.state.searchText, this.props.bookData);
        this.setState({ booksCollectionDisplay: true });
      }
    }
  }
  /**
   * @param {object} event
   * @memberof BooksPage
   * @returns {void}
   */
  bookFilterHandleSelected(event) {
    this.setState({
      bookIsFound: false,
      [event.target.name]: event.target.value
    });
  }
  /**
 * @param {object} event
 * @param {boolean} [set=true]
 * @memberof BooksPage
 * @returns {void}
 */
  bookCollectionHandleClick(event) {
    this.props.checkBookDetails(event.target.name, true);
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
              showbooksByCategory={this.props.displayBooksByCategory}
            />
          </div>
          <div id="book_body" className="">
            <div className="row">
              <BooksFilter
                state={this.state}
                handleSelected={this.bookFilterHandleSelected}
                handleChange={this.bookFilterHandleChange}
                checkBookDetails={this.bookCollectionHandleClick}
                searchbooks={this.props.searchBook}
                filteredData={this.props.filteredData}
                bookData={this.props.bookData}
              />
              <BooksCategory
                state={this.state}
                checkBookDetails={this.bookCollectionHandleClick}
                categoryData={this.props.categoryData}
              />
              <BooksPhoto
                checkBookDetails={this.props.checkBookDetails}
                bookData={this.props.bookData}
              />
              <BooksCollection
                heading={'Available books'}
                bookData={this.props.bookData}
                checkBookDetails={this.bookCollectionHandleClick}
              />
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
  getBooks: PropTypes.func.isRequired,
  isFetched: PropTypes.bool.isRequired,
  searchBook: PropTypes.func.isRequired,
  displayBooksByCategory: PropTypes.func.isRequired
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
    filteredData: state.filteredBooks[0].filteredData,
  };
}
export default connect(mapStateToProps, {
  getBooks,
  searchBook,
  checkBookDetails,
  displayBooksByCategory
})(BooksPage);
