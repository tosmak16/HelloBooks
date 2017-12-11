import _ from 'lodash';
import db from '../models/index';

const validNumber = /^[0-9]+$/;
/** *************************************** */
/* handles return books request */
/* it's an async function which returns a promise */
/** *************************************** */

export const handleReturnBooks = async (borrowedBookId) => {
  let response = {
    status: 200,
    message: 'okay'
  };
  if (_.isUndefined(borrowedBookId)) {
    response = {
      status: 400,
      message: 'borrowedBook Id is required'
    };
    return response;
  }
  if (!borrowedBookId.match(validNumber)) {
    response = {
      status: 400,
      message: 'borrowedBook Id must be a number'
    };
    return response;
  }
  await db.BorrowedBooks
    .findById(borrowedBookId)
    .then((borrowbook) => {
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
      return borrowbook
        .update({
          returnType: true,
          returnDate: Date.now(),
        }).then((returnedBook) => {
          db.Books
            .findById(returnedBook.bookId)
            .then((book) => {
              book
                .update({
                  stockNumber: (book.stockNumber + 1),
                });
            });
          response = {
            status: 200,
            message: 'book has been returned successfully'
          };
          return response;
        });
    });
  return response;
};

export default handleReturnBooks;
