import React from 'react';
import PropTypes from 'prop-types';

/**
 * 
 * 
 * @class MembershipSelect
 * @extends {React.Component}
 */
class MembershipSelect extends React.Component {
  /**
   * 
   * 
   * @returns 
   * @memberof MembershipSelect
   */
  render() {
    return (
      <div>
        <select
          className="browser-default input-field"
          name="filterBy"
          onChange={ this.props.onHandleSelected }
          value={ this.props.value }
        >
          <option defaultValue="bookTitle">Search by</option>
          <option value="bookTitle">Title</option>
          <option value="author">Author</option>
          <option value="category">Category</option>
          <option value="isbn">ISBN</option>
        </select>
      </div>
    );
  }
}

MembershipSelect.propTypes = {
  onHandleSelected: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default MembershipSelect;
