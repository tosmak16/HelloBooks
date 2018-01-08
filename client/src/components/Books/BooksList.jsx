import React from 'react';
import PropTypes from 'prop-types';
import Table from './Table';

/**
 * @param {object} props
 * 
 * @function BooksList
 * 
 * @return {views} Book Table
 */
const BooksList = (props) => {
  const { bookData } = props;
  return (
    <div>
      <div className="row">
        <div className=" col l9 offset-l2 col m9  offset-m2  col s9 offset-s2">
          <h4 className="sub-header">Available books</h4>
          <div className="responsive-table" />
          <Table bookData={bookData} />
        </div>
      </div>
    </div >
  );
};
BooksList.propTypes = {
  bookData: PropTypes.arrayOf(PropTypes.any).isRequired,
};
export default BooksList;
