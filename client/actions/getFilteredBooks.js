export const GET_FILTERED_BOOKS = 'GET_FILTERED_BOOKS'

export function getFilteredBooks(data) {
  return {
    type: GET_FILTERED_BOOKS,
    data
  };
}
