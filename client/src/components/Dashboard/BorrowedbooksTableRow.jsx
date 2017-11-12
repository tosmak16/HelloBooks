import React from 'react';
import PropTypes from 'prop-types';

/**
 * @param {object} props
 * @returns {views} containing table list of user's unreturned book
 */
export function BorrowedbooksTableRow(props) {
  const { book } = props;
  const { bookItem } = props;
  return (
    <tr >
      <td><img src={bookItem[0].image} style={{ width: '30px', height: '30px' }} alt="name" /></td>
      <td>{bookItem[0].bookTitle}</td>
      <td>{bookItem[0].author}</td>
      <td>{bookItem[0].category}</td>
      <td>{bookItem[0].isbn}</td>
      <td>
        <button name={`${book.id},${book.bookId}`} onClick={props.onHandleRead} className="material-icons green-text">import_contacts</button>
        <button name={`${book.id},${book.bookId}`} onClick={props.onHandleClick} className="material-icons red-text">assignment_return</button>
      </td>
    </tr >
  );
}

BorrowedbooksTableRow.propTypes = {
  bookItem: PropTypes.arrayOf(PropTypes.any).isRequired,
  onHandleClick: PropTypes.func.isRequired,
  onHandleRead: PropTypes.func.isRequired,
  book: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default BorrowedbooksTableRow;
