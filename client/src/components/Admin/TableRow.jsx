import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

/**
 * @param {object} props
 * @returns {view} containing table list of book details
 */
function Tablerow(props) {
  const { book, onDelete } = props;
  return (
    <tr >
      <td key={book.id}>.</td>
      <td><img src={book.image} style={{ width: '30px', height: '30px' }} alt="name" /></td>
      <td key={book.bookTitle}><Link href="#"> {book.bookTitle}</Link></td>
      <td >{book.author}</td>
      <td>{book.category}</td>
      <td >{book.stocknumber}</td>
      <td><button
        name={book.id}
        onClick={onDelete}
        className="material-icons red-text "
      >delete_forever</button></td>
    </tr >
  );
}

Tablerow.propTypes = {
  onDelete: PropTypes.func.isRequired,
  book: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Tablerow;
