import React from 'react';
import PropTypes from 'prop-types';

/**
 * @function TableRow
 * @param {object} props
 * @returns {views} Table row 
 */
const TableRow = (props) => {
  const { row } = props;
  return (
    <tr >
      <td key={row.id}>{row.id}</td>
      <td key={row.bookTitle}><a href=""> {row.bookTitle}</a></td>
      <td key={row.author}>{row.author}</td>
      <td key={row.category}>{row.category}</td>
      <td key={row.isbn}>{row.isbn}</td>
      <td key={row.stocknumber}>{row.stocknumber}</td>
    </tr >
  );
};
TableRow.propTypes = {
  row: PropTypes.objectOf(PropTypes.any).isRequired
};
export default TableRow;
