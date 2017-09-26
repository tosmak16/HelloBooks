import React from 'react';
import PropTypes from 'prop-types';


class TableRow extends React.Component {
  render() {
    const { row } = this.props;

    return (
      <tr >
        <td key={ row.id }>.</td>
        <td key={ row.bookTitle }><a href="#"> {row.bookTitle}</a></td>
        <td >{row.author}</td>
        <td>{row.category}</td>
        <td >{row.stocknumber}</td>
        <td><button name={ row.id } onClick={ this.props.onDelete } type="button" className=" btn-danger btn-sm deletebtn">Delete</button></td>
      </tr >
    );
  }
}

TableRow.propTypes = {
  onDelete: PropTypes.func.isRequired,
};

export default TableRow;
