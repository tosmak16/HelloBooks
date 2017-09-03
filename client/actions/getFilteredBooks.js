export const SEARCH_BOOKS = 'SEARCH_BOOKS'

export function getFilteredBooks(data) {
  return {
    type: SEARCH_BOOKS,
    data
  };
}
