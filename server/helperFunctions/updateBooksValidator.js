import _ from 'lodash';

const validNumber = /^[0-9]+$/;

/** *************************************** */
/* valdiates book details parameters */
/** *************************************** */
/**
 * @description valdiates book details parameters
 * @param {object} requestBody 
 * @returns {object} response
 */
export const updateBooksValidator = async (requestBody) => {
  const { bookTitle, author, category, stockNumber, isbn } = requestBody;
  const response = await Promise.resolve(
    // Checks validity of booktitle and it's length
    !_.isEmpty(bookTitle) && bookTitle.length < 3 ?
      { status: 400, message: 'book title length should be more than 2' } :
      // Checks Validity of author if it's empty and less than two in length
      !_.isEmpty(author) && author.length < 2 ?
        { status: 400, message: 'author length should be more than 2' } :
        // Checks validity of books number in stock if it's empty and is a number
        !_.isEmpty(stockNumber) && !stockNumber.match(validNumber) ?
          { status: 400, message: 'stock number should be a number' } :
          // Checks validity of isbn is a number and if it's empty
          !_.isEmpty(isbn) && !isbn.match(validNumber) ?
            { status: 400, message: 'isbn should be a number' } :
            // Checks validity of isbn value length and if it's empty
            !_.isEmpty(isbn) && isbn.length < 10 ?
              { status: 400, message: 'isbn length should be more than 10' } :
              // Checks if book's category is empty and it's a number using regex
              !_.isEmpty(category) && category.match(validNumber) ?
                { status: 400, message: 'book category should not  be a number' } : ''
  );
  return response;
};

export default updateBooksValidator;
