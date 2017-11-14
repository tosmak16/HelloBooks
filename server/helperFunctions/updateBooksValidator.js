import lodash from 'lodash';

const validNumber = /^[0-9]+$/;

/** *************************************** */
/* valdiates book details parameters */
/** *************************************** */

export const updateBooksValidator = (body) => {
  const {
    bookTitle,
    author,
    category,
    stockNumber,
    isbn
  } = body;
  if (!lodash.isEmpty(bookTitle) && bookTitle.length < 3) {
    return 'book title length should be more than 2';
  }
  if (!lodash.isEmpty(author) && author.length < 2) {
    return 'author length should be more than 2';
  }
  if (!lodash.isEmpty(stockNumber) && !stockNumber.match(validNumber)) {
    return 'stock number should be a number';
  }
  if (!lodash.isEmpty(isbn) && !isbn.match(validNumber)) {
    return 'isbn should be a number';
  }
  if (!lodash.isEmpty(isbn) && isbn.length < 10) {
    return 'isbn length should be more than 10';
  }
  if (!lodash.isEmpty(category) && category.match(validNumber)) {
    return 'book category should not  be a number';
  }
};

export default updateBooksValidator;
