import React from 'react';
import PropTypes from 'prop-types';

import TableRow from './TableRow';


class Table extends React.Component {
  render() {
    const { products } = this.props;

    const tablerow = products.map(row =>
      <TableRow row={ row } key={ row.id } value={ row.id } />
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
  products: PropTypes.array.isRequired
};

export default Table;

