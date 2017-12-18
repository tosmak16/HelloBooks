export const removeStoredBookDetails = () => {
  localStorage.removeItem('bookId');
  localStorage.removeItem('id');
  localStorage.removeItem('category');
  localStorage.removeItem('isbn');
  localStorage.removeItem('stockNumber');
  localStorage.removeItem('author');
  localStorage.removeItem('summary');
  localStorage.removeItem('bookTitle');
  localStorage.removeItem('image');
};

export default removeStoredBookDetails;
