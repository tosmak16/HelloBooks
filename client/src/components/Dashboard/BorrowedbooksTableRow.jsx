import React from 'react';
import PropTypes from 'prop-types';

/**
 * @description Displays Borrowed Books Table row
 * 
 * @param {object} props
 * 
 * @returns {views} containing table list of user's unreturned book
 */
export const BorrowedbooksTableRow = (props) => {
  const { book } = props;
  const { bookItem } = props;
  const { image, bookTitle, author, category, isbn } = bookItem[0];
  return (
    <tr >
      {<td><img src={image} style={{ width: '30px', height: '30px' }} alt="name" /></td>}
      <td>{bookTitle}</td>
      <td>{author}</td>
      <td>{category}</td>
      <td>{isbn}</td>
      <td>
        <button name={`${book.id},${book.bookId}`} onClick={props.onHandleRead} className="material-icons green-text">import_contacts</button>
        <button name={`${book.id},${book.bookId}`} onClick={props.onHandleClick} className="material-icons red-text">assignment_return</button>
      </td>
    </tr >
  );
};
BorrowedbooksTableRow.propTypes = {
  bookItem: PropTypes.arrayOf(PropTypes.any).isRequired,
  onHandleClick: PropTypes.func.isRequired,
  onHandleRead: PropTypes.func.isRequired,
  book: PropTypes.objectOf(PropTypes.any).isRequired,
};
export default BorrowedbooksTableRow;
