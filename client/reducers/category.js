import { SHOW_BOOKS_BY_CATEGORY } from '../actions/getFilteredBooks';

const initialState = {
  category: '',
  categoryData: '',
  selectedCategory: false,
};
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SHOW_BOOKS_BY_CATEGORY:
      return [...state, {
        category: action.category,
        categoryData: action.data,
        selectedCategory: true,
      }];

    default: return state;
  }
};
