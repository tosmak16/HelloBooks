import React from 'react';
import PropTypes from 'prop-types';


class BbTableRow extends React.Component {
  render() {
    const { row } = this.props;
    const { bookItem } = this.props;
    return (
      <tr >
        <td>.</td>
        <td> {bookItem[0].bookTitle}</td>
        <td >{bookItem[0].author}</td>
        <td>{bookItem[0].category}</td>
        <td>{bookItem[0].isbn}</td>
        <td><button name={ `${row.id},${row.bookId}` } type="button" onClick={ this.props.onHandleClick } className="btn-sm btn-success btn-sm returnbtn">Return</button></td>
      </tr >
    );
  }
}

BbTableRow.propTypes = {
  onHandleClick: PropTypes.func.isRequired,
};

export default BbTableRow;
