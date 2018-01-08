import _ from 'lodash';
import db from '../models/index';

const validNumber = /^[0-9]+$/;
/** *************************************** */
/* handles return books request */
/* it's an async function which returns a promise */
/** *************************************** */
/**
 * @description handles return books request
 * 
 * @param {object} borrowedBookId 
 * 
 * @returns {object} response message
 */
export const handleReturnBooks = async (borrowedBookId) => {
  let response = { status: 200, message: 'okay' };
  if (_.isUndefined(borrowedBookId)) {
    response = { status: 400, message: 'borrowedBook Id is required' };
    return response;
  }
  if (!borrowedBookId.match(validNumber)) {
    response = { status: 400, message: 'borrowedBook Id must be a number' };
    return response;
  }
  const borrowbook = await db.BorrowedBooks.findById(borrowedBookId);
  if (!borrowbook) {
    response = {
      status: 404,
      message: 'Record not found'
    };
    return response;
  }
  if (borrowbook.returnType === true) {
    response = {
      status: 403,
      message: 'This book has been returned before'
    };
    return response;
  }
  const returnedBook = await borrowbook.update({
    returnType: true,
    returnDate: Date.now(),
  });
  const book = await db.Books.findById(returnedBook.bookId);
  book.update({ stockNumber: (book.stockNumber + 1) });
  response = {
    status: 200,
    message: 'book has been returned successfully',
    bookTitle: book.bookTitle
  };
  return response;
};

export default handleReturnBooks;
