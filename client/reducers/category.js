import { SHOW_BOOKS_BY_CATEGORY } from '../actions/getFilteredBooks';

const initialState = {
  category: '',
  categoryData: '',
  selectedCategory: false,
};
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SHOW_BOOKS_BY_CATEGORY:
      return [{
        category: action.category,
        categoryData: action.data,
        selectedCategory: true,
      }, ...state];

    default: return state;
  }
};
