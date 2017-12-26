import React from 'react';
import PropTypes from 'prop-types';
import lodash from 'lodash';
import BooksCollection from './BooksCollection';
/**
 *@function BooksCategory
 *@param {object} props 
 *@return {view} books collection
 */
const BooksCategory = (props) => {
  const { checkBookDetails, state } = props;
  const { sortedData } = state;
  return (
    <div className="row">
      {!lodash.isEmpty(sortedData.categoryData) ?
        <BooksCollection checkBookDetails={checkBookDetails} heading={`${sortedData.category} Books`} bookData={sortedData.categoryData} /> :
        sortedData.selectedCategory &&
        <BooksCollection checkBookDetails={checkBookDetails} heading={`No available ${sortedData.category} Books`} bookData={[]} />
      }
    </div>
  );
};
BooksCategory.propTypes = {
  state: PropTypes.objectOf(PropTypes.any).isRequired,
  checkBookDetails: PropTypes.func.isRequired,
};
export default BooksCategory;
