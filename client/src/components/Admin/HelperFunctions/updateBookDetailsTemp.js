import _ from 'lodash';
/**
 * @description update book state
 * @param {object} bookState 
 * @returns {void}
 */
export const updateBookDetailsTemp = (bookState) => {
  const {
    bookData,
    bookId,
    bookTitle,
    author,
    category,
    isbn,
    stockNumber,
    image,
    summary
  } = bookState;
  const bookIndex = _.findIndex(bookData, ['id', Number(bookId)]);
  bookState.bookData[bookIndex] = {
    id: bookId,
    bookTitle,
    author,
    category,
    isbn,
    stockNumber,
    image,
    summary
  };
};
export default updateBookDetailsTemp;
