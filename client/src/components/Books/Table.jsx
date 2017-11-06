import React from 'react';
import PropTypes from 'prop-types';

import TableRow from './TableRow';

/**
 * @class Table
 * @extends {React.PureComponent}
 */
class Table extends React.PureComponent {
  /**
   * @returns {views} containing table list data
   * @memberof Table
   */
  render() {
    const { bookData } = this.props;

    const tablerow = bookData.map(row =>
      (<TableRow
        key={row.id}
        row={row}
        value={row.id}
      />)
    );
    return (
      <table className="table striped">
        <thead>
          <tr>
            <th><i className="material-icons ">search</i></th>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>ISBN</th>
            <th>Number in stock</th>
          </tr>
        </thead>
        <tbody>
          {tablerow}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  bookData: PropTypes.objectOf(PropTypes.any).isRequired
};

export default Table;

