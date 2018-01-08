import React from 'react';
import PropTypes from 'prop-types';
import SearchBar from '../SearchBar';
import BooksCollection from './BooksCollection';
import CategorySelect from '../select/CategorySelect';

/** 
 * @description renders select, searchbar and searched books collection
 * 
 * @param {object} props 
 * 
 * @returns {views} select, searchbar and searched books collection component
 */
const BooksFilter = (props) => {
  const { handleChange, handleSelected, filteredData, checkBookDetails, state } = props;
  const { searchText, bookIsFound, filterBy, booksCollectionDisplay } = state;
  return (
    <div id="booksearchbar" className="container-fluid">
      <div className="row">
        <div className="col l3  offset-l2  col m3  offset-m2  col s12 ">
          <CategorySelect
            onHandleSelected={handleSelected}
            value={filterBy}
          />
        </div>
        <div className="col l6 col m6 col s12 ">
          <SearchBar
            onChange={handleChange}
            name="searchText"
            value={searchText}
          />
        </div>
      </div >
      <div className="row">
        {filteredData.length !== 0 && bookIsFound && <BooksCollection checkBookDetails={checkBookDetails} heading={'Search results'} bookData={filteredData} />}
        {filteredData.length === 0 && booksCollectionDisplay && <BooksCollection heading={'No search results'} checkBookDetails={checkBookDetails} bookData={filteredData} />}
      </div>
    </div >
  );
};
BooksFilter.propTypes = {
  state: PropTypes.objectOf(PropTypes.any).isRequired,
  checkBookDetails: PropTypes.func.isRequired,
  handleSelected: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  filteredData: PropTypes.arrayOf(PropTypes.any).isRequired,
};
export default BooksFilter;

