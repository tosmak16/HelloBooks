import React from 'react';
import PropTypes from 'prop-types';

export class SearchBar extends React.Component {
  render() {
    return (
      <div className="input-field">
        <input
          id="search" type="search"
          style={{ backgroundColor: 'white', textAlign: 'center' }}
          required
          name={ this.props.name }
          onChange={ this.props.onChange }
          value={ this.props.value }
        />
        <label className="label-icon" htmlFor="search">
          <i className="material-icons">search</i></label>
      </div>
    );
  }
}

SearchBar.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,

};


export default SearchBar;
