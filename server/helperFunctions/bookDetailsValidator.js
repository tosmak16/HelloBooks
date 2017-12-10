import _ from 'lodash';

const validNumber = /^[0-9]+$/;
/** *************************************** */
/* valdiates book details parameters */
/** *************************************** */

export const bookDetailsValidator = async (body) => {
  const { bookTitle, author, category, stockNumber, summary, isbn } = body;
  const responseMessage = await Promise
    .resolve(
      _.isEmpty(bookTitle) ? 'bookTitle is required' :
        _.isEmpty(author) ? 'author is required' :
          bookTitle.length < 3 ? 'book title length should be more than 2' :
            author.length < 2 ? 'author length should be more than 2' :
              _.isEmpty(stockNumber) ? 'book number in stock is required' :
                !stockNumber.match(validNumber) ?
                  'stock number should be a number' :
                  _.isEmpty(isbn) ? 'isbn is required' :
                    !isbn.match(validNumber) ? 'isbn should be a number' :
                      isbn.length < 10 ? 'isbn length should be more than 10' :
                        _.isEmpty(category) ? 'book category is required' :
                          category.match(validNumber) ?
                            ' book category should not  be a number' :
                            _.isEmpty(summary) ? 'book summary is required' :
                              '');
  return responseMessage;
};
export default bookDetailsValidator;
