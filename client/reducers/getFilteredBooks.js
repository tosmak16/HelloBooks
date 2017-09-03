import { GET_FILTERED_BOOKS } from '../actions/getFilteredBooks';

const initialState = {
  filteredData: ''
};
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_FILTERED_BOOKS:
      return {
        filteredData: action.data,
      };
    default: return state;
  }
};
