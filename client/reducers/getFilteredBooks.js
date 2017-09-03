import { SEARCH_BOOKS } from '../actions/getFilteredBooks';

const initialState = {
  filteredData: ''
};
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SEARCH_BOOKS:
      return {
        filteredData: action.data,
      };
    default: return state;
  }
};
