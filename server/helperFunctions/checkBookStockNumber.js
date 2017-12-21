import db from '../models/index';

/** *************************************** */
/* it checks if a book exist and if it's available in stocks */
/* it's an async function which returns a promise */
/** *************************************** */
/**
 * @description an async function that checks if a book is still avaliable
 * @param {object} queryObject 
 * @returns {object} response
 */
export const checkBookStockNumber = async (queryObject) => {
  let response = { status: 200, message: 'okay', bookTitle: '' };
  await db.Books
    .findById(queryObject)
    .then((book) => {
      if (book === null) {
        response = {
          status: 404,
          message: 'Book Not Found'
        };
        return response;
      }
      if (book.stockNumber === 0) {
        response = {
          status: 404,
          message: 'Book Not available in stock'
        };
        return response;
      }
      response.bookTitle = book.bookTitle;
      book.update({
        stockNumber: book.stockNumber - 1
      });
    }).catch((errorMessage) => {
      response = {
        status: 400,
        message: errorMessage.errors[0].message.toString()
      };
      return response;
    });

  return response;
};

export default checkBookStockNumber;
