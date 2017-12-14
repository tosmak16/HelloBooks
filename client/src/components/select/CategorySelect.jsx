import React from 'react';
import PropTypes from 'prop-types';

/**
 * @function CategorySelect
 * @param {object} props
 * @returns {views} containing select input field
 */
const CategorySelect = props => (
  <div>
    <select
      className="browser-default input-field"
      name="filterBy"
      onChange={props.onHandleSelected}
      value={props.value}
    >
      <option defaultValue="bookTitle">Search by</option>
      <option value="bookTitle">Title</option>
      <option value="author">Author</option>
      <option value="category">Category</option>
      <option value="isbn">ISBN</option>
    </select>
  </div>
);
CategorySelect.propTypes = {
  onHandleSelected: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default CategorySelect;
