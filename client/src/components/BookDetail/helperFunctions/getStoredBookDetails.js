export const getStoredBookDetails = (filteredData) => {
  filteredData.bookTitle = localStorage.getItem('bookTitle');
  filteredData.id = localStorage.getItem('id');
  filteredData.category = localStorage.getItem('category');
  filteredData.isbn = localStorage.getItem('isbn');
  filteredData.stockNumber = localStorage.getItem('stockNumber');
  filteredData.author = localStorage.getItem('author');
  filteredData.summary = localStorage.getItem('summary');
  filteredData.image = localStorage.getItem('image');
};

export default getStoredBookDetails;
