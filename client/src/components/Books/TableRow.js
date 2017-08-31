import React from 'react';
import PropTypes from 'prop-types';


class TableRow extends React.Component {
  render() {
    const { row } = this.props;

    return (
      <tr >
        <td key={ row.id }>{row.id}</td>
        <td key={ row.bookTitle }>{row.bookTitle}</td>
        <td key={ row.author }>{row.author}</td>
        <td key={ row.category }>{row.category}</td>
        <td key={ row.isbn }>{row.isbn}</td>
        <td key={ row.stocknumber }>{row.stocknumber}</td>
      </tr >
    );
  }
}

TableRow.propTypes = {

};

export default TableRow;
