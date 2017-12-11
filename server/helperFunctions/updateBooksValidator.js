import _ from 'lodash';

const validNumber = /^[0-9]+$/;

/** *************************************** */
/* valdiates book details parameters */
/** *************************************** */

export const updateBooksValidator = async (body) => {
  const {
    bookTitle,
    author,
    category,
    stockNumber,
    isbn
  } = body;
  const response = await Promise.resolve(
    !_.isEmpty(bookTitle) && bookTitle.length < 3 ?
      { status: 400, message: 'book title length should be more than 2' } :
      !_.isEmpty(author) && author.length < 2 ?
        { status: 400, message: 'author length should be more than 2' } :
        !_.isEmpty(stockNumber) && !stockNumber.match(validNumber) ?
          { status: 400, message: 'stock number should be a number' } :
          !_.isEmpty(isbn) && !isbn.match(validNumber) ?
            { status: 400, message: 'isbn should be a number' } :
            !_.isEmpty(isbn) && isbn.length < 10 ?
              { status: 400, message: 'isbn length should be more than 10' } :
              !_.isEmpty(category) && category.match(validNumber) ?
                {
                  status: 400,
                  message: 'book category should not  be a number'
                } : ''
  );
  return response;
};

export default updateBooksValidator;
