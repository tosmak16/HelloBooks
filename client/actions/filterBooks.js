export const SEARCH_BOOKS = 'SEARCH_BOOKS';
export const SHOW_BOOKS_BY_CATEGORY = 'SHOW_BOOKS_BY_CATEGORY';
/**
 * @param {object} data 
 * 
 * @returns {object} of searched books
 */
export const searchFilteredBooks = (data) => {
  return {
    type: SEARCH_BOOKS,
    data
  };
}
/**
 * @param {object} data 
 * 
 * @param {string} category 
 * 
 * @returns {object} of filtered books
 */
export const filteredByCategory = (data, category) => {
  return {
    type: SHOW_BOOKS_BY_CATEGORY,
    data,
    category
  };
}
