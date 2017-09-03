import { SEARCH_BOOKS, SHOW_BOOKS_BY_CATEGORY } from '../actions/getFilteredBooks';

const initialState = {
  filteredData: '',
  category: '',
  categoryData: '',
};
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SEARCH_BOOKS:
      return {
        filteredData: action.data,
      };

    case SHOW_BOOKS_BY_CATEGORY:
      return {
        category: action.category,
        categoryData: action.data
      };
    default: return state;
  }
};
