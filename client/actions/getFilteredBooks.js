export const SEARCH_BOOKS = 'SEARCH_BOOKS';
export const SHOW_BOOKS_BY_CATEGORY = 'SHOW_BOOKS_BY_CATEGORY';

export function getFilteredBooks(data) {
  return {
    type: SEARCH_BOOKS,
    data
  };
}

export function showBooksByCategory(data, category) {
  return {
    type: SHOW_BOOKS_BY_CATEGORY,
    data,
    category
  };
}
