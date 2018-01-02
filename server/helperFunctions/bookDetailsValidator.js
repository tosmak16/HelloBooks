import _ from 'lodash';

const validNumber = /^[0-9]+$/;
/** *************************************** */
/* valdiates book details parameters */
/** *************************************** */
/**
 * @description This is an asyc function for validating book details
 * @param {object} body 
 * @returns {object} responseMessage
 */
export const bookDetailsValidator = async (body) => {
  const { bookTitle, author, category, stockNumber, summary, isbn } = body;
  /* response message is sent when promise is resolved based on the conditions  */
  const responseMessage = await Promise
    .resolve(
    // Checks if book Title is empty
      _.isEmpty(bookTitle) ? 'bookTitle is required' :
      // Checks if book author is empty
        _.isEmpty(author) ? 'author is required' :
        // checks book Title length
          bookTitle.length < 3 ? 'book title length should be more than 2' :
          // Checks  author name length if it is less than two
            author.length < 2 ? 'author length should be more than 2' :
            // Checks if books number in stock is empty
              _.isEmpty(stockNumber) ? 'book number in stock is required' :
              // Checks if number in stock matches a number using regex
                !stockNumber.match(validNumber) ?
                  'stock number should be a number' :
                  // Checks if isbn is empty
                  _.isEmpty(isbn) ? 'isbn is required' :
                  // Checks if isbn is a number using regex
                    !isbn.match(validNumber) ? 'isbn should be a number' :
                    // checks if isbn length is less than 10
                      isbn.length < 10 ? 'isbn length should be more than 10' :
                      // checks if book category is empty
                        _.isEmpty(category) ? 'book category is required' :
                        // Checks if category is a number
                          category.match(validNumber) ?
                            ' book category should not  be a number' :
                            // Checks if book summary is empty
                            _.isEmpty(summary) ? 'book summary is required' :
                              '');
  return responseMessage;
};
export default bookDetailsValidator;
