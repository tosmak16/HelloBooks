import lodash from 'lodash';

const validNumber = /^[0-9]+$/;

/** *************************************** */
/* valdiates book details parameters */
/** *************************************** */

export const bookDetailsValidator = (body) => {
  const {
    bookTitle,
    author,
    category,
    stocknumber,
    summary,
    isbn
  } = body;
  if (lodash.isEmpty(bookTitle)) {
    return 'bookTitle is required';
  }
  if (lodash.isEmpty(author)) {
    return 'author is required';
  }
  if (bookTitle.length < 3) {
    return 'book title length should be more than 2';
  }
  if (author.length < 2) {
    return 'author length should be more than 2';
  }
  if (lodash.isEmpty(stocknumber)) {
    return 'book number in stock is required';
  }
  if (!stocknumber.match(validNumber)) {
    return 'stock number should be a number';
  }
  if (lodash.isEmpty(isbn)) {
    return 'isbn is required';
  }
  if (!isbn.match(validNumber)) {
    return 'isbn should be a number';
  }
  if (isbn.length < 10) {
    return 'isbn length should be more than 10';
  }
  if (lodash.isEmpty(category)) {
    return 'book category is required';
  }
  if (category.match(validNumber)) {
    return 'book category should not  be a number';
  }
  if (lodash.isEmpty(summary)) {
    return 'book summary is required';
  }
};

export default bookDetailsValidator;
