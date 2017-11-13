import db from '../models/index';

/** *************************************** */
/* it checks if a book exist and if it's available in stocks */
/* it's an async function which returns a promise */
/** *************************************** */

export const checkBookStockNumber = async (queryObject) => {
  let responseMessage = '';
  let responseType = '';
  let response = {
    responseMessage,
    responseType
  };
  await db.Books
    .findById(queryObject)
    .then((book) => {
      if (book === null) {
        responseMessage = 'Book Not Found';
        responseType = 'done';
        response = {
          responseMessage,
          responseType
        };
        return response;
      }

      if (book.stockNumber === 0) {
        responseMessage = 'Book Not available in stock';
        responseType = 'done';
        response = {
          responseMessage,
          responseType
        };
        return response;
      }

      book.update({
        stockNumber: book.stockNumber - 1
      });
    }).catch((errorMessage) => {
      responseMessage = errorMessage.errors[0].message.toString();
      responseType = 'error';
      response = {
        responseMessage,
        responseType
      };
      return response;
    });

  return response;
};

export default checkBookStockNumber;
