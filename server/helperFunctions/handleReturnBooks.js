import lodash from 'lodash';
import db from '../models/index';

const validNumber = /^[0-9]+$/;
/** *************************************** */
/* handles return books request */
/* it's an async function which returns a promise */
/** *************************************** */

export const handleReturnBooks = async (queryObject) => {
  let responseMessage = '';
  let responseType = '';
  let response = {
    responseMessage,
    responseType
  };
  if (lodash.isUndefined(queryObject)) {
    responseMessage = 'borrowedBook Id is required';
    responseType = 400;
    response = {
      responseMessage,
      responseType
    };
    return response;
  }
  if (!queryObject.match(validNumber)) {
    responseMessage = 'borrowedBook Id must be a number';
    responseType = 400;
    response = {
      responseMessage,
      responseType
    };
    return response;
  }
  await db.BorrowedBooks
    .findById(queryObject)
    .then((borrowbook) => {
      if (!borrowbook) {
        responseMessage = 'Record not found';
        responseType = 404;
        response = {
          responseMessage,
          responseType
        };
        return response;
      }
      if (borrowbook.returnType === true) {
        responseMessage = 'This book has been returned before';
        responseType = 403;
        response = {
          responseMessage,
          responseType
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
          responseMessage = 'book has been returned successfully';
          responseType = 200;
          response = {
            responseMessage,
            responseType
          };
          return response;
        });
    });
  return response;
};

export default handleReturnBooks;
