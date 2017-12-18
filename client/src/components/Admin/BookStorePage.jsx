import React from 'react';
import PropTypes from 'prop-types';
import TableRow from './TableRow';
import DoubleActionModal from '../modal/DoubleActionModal';
import SingleActionModal from '../modal/SingleActionModal';
import CategorySelect from '../select/CategorySelect';
import SearchBar from '../SearchBar';
import ActivityLoader from '../preloader/ActivityLoader';

/**
 * @function BookStorePage
 * @param {object} props
 * @returns {views} BooksStorePage
 */
const BookStorePage = (props) => {
  const { filteredData, state, handleSelected, handleChange,
    handleDelete, handleExit, handleNo, handleYes } = props;
  const { filterBookLoaded, errors, displayPreloader, message, filterBy, searchText } = state;
  const tablerow = filteredData.map(book =>
    (<TableRow
      key={book.id}
      book={book}
      value={book.id}
      onDelete={handleDelete}
    />)
  );
  const tableholder = (<div className="table-responsive">
    <table className="table responsive-table bordered highlight striped">
      <thead>
        <tr>
          <th><span className="glyphicon glyphicon-education" /></th>
          <th>Image</th>
          <th>Title</th>
          <th>Author</th>
          <th>Category</th>
          <th>No in Stock</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {tablerow}
      </tbody>
    </table>
  </div>);
  return (
    <div id="bb_table" className="row">
      <div className=" col l10 offset-l2 col m10 offset-m2 col s12">
        <div className="row">
          <div className="col l3  col m3 col s12 ">
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
        {filteredData.length !== 0 && filterBookLoaded &&
          <h4 className="sub-header"> Search result</h4>}
        {filteredData.length === 0 && filterBookLoaded &&
          <h4 className="sub-header">No Search result</h4>}
        {filteredData.length !== 0 && filterBookLoaded && tableholder}
        <SingleActionModal
          id={'modal3'}
          heading={'Done!'}
          message={message || ''}
          onHandleExit={handleExit}
        />
        <SingleActionModal
          id={'modal2'}
          heading={'Oh!'}
          message={errors || ''}
          onHandleExit={handleExit}
        />
        <DoubleActionModal
          id={'modal1'}
          onHandleClick={handleYes}
          onHandleClose={handleNo}
          bookTitle={''}
          heading={'Do you want to remove this book from store?'}
        />
        <div
          style={{ display: displayPreloader.toString() }}
          id="activity-loader-id"
          className="activity"
        >
          <ActivityLoader />
        </div>
      </div>
    </div>
  );
};
BookStorePage.propTypes = {
  filteredData: PropTypes.arrayOf(PropTypes.any).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleExit: PropTypes.func.isRequired,
  handleNo: PropTypes.func.isRequired,
  handleSelected: PropTypes.func.isRequired,
  handleYes: PropTypes.func.isRequired,
  state: PropTypes.objectOf(PropTypes.any).isRequired
};
export default BookStorePage;
