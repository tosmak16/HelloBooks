import React from 'react';
import PropTypes from 'prop-types';


import SearchBar from '../SearchBar';
import BooksCollection from './BooksCollection';
import CategorySelect from '../select/CategorySelect';

let bookIsFound = false;

/**
 * @class BooksFilter
 * @extends {React.Component}
 */
class BooksFilter extends React.Component {
  /**
   * Creates an instance of BooksFilter.
   * @param {object} props
   * @memberof BooksFilter
   */
  constructor(props) {
    super(props);
    this.state = {
      filterBy: '',
      searchText: '',
      error: '',
      booksCollectionDisplay: false
    };

    this.handleChange = this.handleChange.bind(this);

    this.handleSelected = this.handleChange.bind(this);
  }
  /**
   * @memberof BooksFilter
   * @returns {void}
   */
  componentWillMount() {
    bookIsFound = false;
  }

  /**
   * @param {object} event
   * @memberof BooksFilter
   * @returns {void}
   */
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    if (event.target.value.length > 3 && this.state.filterBy !== '') {
      bookIsFound = true;
      this.setState({ error: '' });
      if (this.state.filterBy && this.state.searchText && this.props.bookData) {
        this.props.searchbooks(this.state.filterBy, this.state.searchText, this.props.bookData);
        this.setState({ booksCollectionDisplay: true });
      }
    }
  }

  /**
   * @param {object} event
   * @memberof BooksFilter
   * @returns {void}
   */
  handleSelected(event) {
    bookIsFound = false;
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * @returns {views} with book collection component
   * @memberof BooksFilter
   */
  render() {
    const { filteredData, checkBookDetails } = this.props;
    if (filteredData.length === 0) {
      bookIsFound = false;
    }
    return (
      <div id="booksearchbar" className="container-fluid">
        <div className="row">
          <div className="col l3  offset-l2  col m3  offset-m2  col s12 ">
            <CategorySelect
              onHandleSelected={this.handleSelected}
              value={this.state.filterBy}
            />
          </div>
          <div className="col l6 col m6 col s12 ">
            <SearchBar
              onChange={this.handleChange}
              name="searchText"
              value={this.state.searchText}
            />
          </div>
        </div >
        <div className="row">
          {filteredData.length !== 0 && bookIsFound && <BooksCollection checkBookDetails={checkBookDetails} heading={'Search results'} bookData={filteredData} />}
          {filteredData.length === 0 && bookIsFound === false && this.state.booksCollectionDisplay && <BooksCollection heading={'No search results'} checkBookDetails={checkBookDetails} bookData={filteredData} />}
        </div>
      </div >
    );
  }
}

BooksFilter.propTypes = {
  checkBookDetails: PropTypes.func.isRequired,
  bookData: PropTypes.arrayOf(PropTypes.any).isRequired,
  filteredData: PropTypes.arrayOf(PropTypes.any).isRequired,
  searchbooks: PropTypes.func.isRequired,
};


export default BooksFilter;

