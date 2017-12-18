import React from 'react';
import PropTypes from 'prop-types';

let borrowDate = [];
let returnDate = [];
/**
 * @param {object} props
 * @returns {views} containing user's borrowing history
 */
export function BookHistoryTableRow(props) {
  const { book } = props;
  const { bookItem } = props;
  const { image, bookTitle, author } = bookItem[0];
  borrowDate = book.borrowDate;
  returnDate = book.returnDate;
  return (
    <tr >
      {image && <td >
        <img
          src={image || ''}
          style={{ width: '30px', height: '30px' }}
          alt="name"
        />
      </td>}
      <td>{bookTitle}</td>
      <td>{author}</td>
      <td>{borrowDate.slice(0, borrowDate.search('T'))}</td>
      <td > {book.returnDate ? returnDate.slice(0, returnDate.search('T')) : 'Not yet returned'} </td>
    </tr >
  );
}
BookHistoryTableRow.propTypes = {
  bookItem: PropTypes.arrayOf(PropTypes.any).isRequired,
  book: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default BookHistoryTableRow;
