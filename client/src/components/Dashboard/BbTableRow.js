import React from 'react';
import PropTypes from 'prop-types';


class BbTableRow extends React.Component {
  render() {
    const { row } = this.props;
    const { bookItem } = this.props;
    return (
      <tr >
        <td><img src={ bookItem[0].image } style={{ width: '30px', height: '30px' }} alt="name" /></td>
        <td> {bookItem[0].bookTitle}</td>
        <td >{bookItem[0].author}</td>
        <td>{bookItem[0].category}</td>
        <td>{bookItem[0].isbn}</td>
        <td>
          <button name={ `${row.id},${row.bookId}` } onClick={ this.props.onHandleRead } className="material-icons green-text">import_contacts</button>
          <button name={ `${row.id},${row.bookId}` } onClick={ this.props.onHandleClick } className="material-icons red-text">assignment_return</button>

        </td>
      </tr >
    );
  }
}


BbTableRow.propTypes = {
  bookItem: PropTypes.array.isRequired,
  onHandleClick: PropTypes.func.isRequired,
  onHandleRead: PropTypes.func.isRequired,
  row: PropTypes.object.isRequired,

};

export default BbTableRow;
