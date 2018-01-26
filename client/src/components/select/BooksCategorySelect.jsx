import React from 'react';
import PropTypes from 'prop-types';

/**
 * @function BooksCategorySelect
 * 
 * @param {object} props
 * 
 * @returns {views} containing select input field
 */
export const BooksCategorySelect = (props) => {
  const { onHandleSelected, value, categoryData } = props;
  const option = categoryData.map((categoryItem) => {
    const { id, categoryName } = categoryItem;
    return (<option key={id} value={categoryName}>{categoryName}</option>);
  });
  return (
    <div>
      <select
        style={{ backgroundColor: 'transparent' }}
        className="browser-default input-field"
        name="category"
        onChange={onHandleSelected}
        value={value}
      >
        <option defaultValue="bookTitle">Search by</option>
        {option}
      </select>
    </div>
  );
};
BooksCategorySelect.propTypes = {
  categoryData: PropTypes.arrayOf(PropTypes.any).isRequired,
  onHandleSelected: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
export default BooksCategorySelect;
