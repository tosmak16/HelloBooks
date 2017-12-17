

export const storeBookDetailsTemp = (filteredData) => {
  const { bookTitle, id, category, isbn, stockNumber, author, image, summary } = filteredData;
  localStorage.setItem('image', image);
  localStorage.setItem('bookTitle', bookTitle);
  localStorage.setItem('id', id);
  localStorage.setItem('category', category);
  localStorage.setItem('isbn', isbn);
  localStorage.setItem('stockNumber', stockNumber);
  localStorage.setItem('author', author);
  localStorage.setItem('summary', summary);
};
export default storeBookDetailsTemp;
