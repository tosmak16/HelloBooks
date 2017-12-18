import _ from 'lodash';

const validNumber = /^[0-9]+$/;
/** *************************************** */
/* valdiates book details parameters */
/** *************************************** */
/**
 * @description This is asyc function for validating book details
 * @param {object} userData 
 * @returns {object} responseMessage
 */
export const validateBookDetails = async (userData) => {
  const { bookTitle, author, category, stockNumber, summary, isbn } = userData;
  /* response message is sent when promise is resolved based on the conditions  */
  const responseMessage = await Promise
    .resolve(
    // Checks if book Title is empty
      _.isEmpty(bookTitle) ? 'Title is required' :
      // Checks if book author is empty
        _.isEmpty(author) ? 'Author is required' :
        // checks book Title length
          bookTitle.length < 3 ? 'Book title length should be more than 2' :
          // Checks  author name length if it is less than two
            author.length < 2 ? 'Author length should be more than 2' :
            // Checks if books number in stock is empty
              _.isEmpty(stockNumber) ? 'Book number in stock is required' :
              // Checks if number in stock matches a number using regex
                !stockNumber.match(validNumber) ?
                  'Stock number should be a number' :
                  // Checks if isbn is empty
                  _.isEmpty(isbn) ? 'ISBN is required' :
                  // Checks if isbn is a number using regex
                    !isbn.match(validNumber) ? 'ISBN should be a number' :
                    // checks if isbn length is less than 10
                      isbn.length < 10 ? 'ISBN length should be more than 10' :
                      // checks if book category is empty
                        _.isEmpty(category) ? 'Book category is required' :
                        // Checks if category is a number
                          category.match(validNumber) ?
                            ' Book category should not  be a number' :
                            // Checks if book summary is empty
                            _.isEmpty(summary) ? 'Book summary is required' :
                              '');
  return responseMessage;
};
export default validateBookDetails;
