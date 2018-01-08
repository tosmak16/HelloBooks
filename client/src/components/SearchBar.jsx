import React from 'react';
import PropTypes from 'prop-types';

/**
 * @description it's a functional component for search Input
 * 
 * @function SearchBar
 * 
 * @param {object} props
 * 
 * @returns {views} Searchbar element and properties
 */
const SearchBar = props =>
  (
    <div className="input-field">
      <input
        id="search"
        type="search"
        style={{ backgroundColor: 'white', textAlign: 'center' }}
        required
        name={props.name}
        onChange={props.onChange}
        value={props.value}
      />
      <label className="label-icon" htmlFor="search">
        <i className="material-icons">search</i></label>
    </div>
  );
SearchBar.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
export default SearchBar;
