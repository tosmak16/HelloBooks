import { SEARCH_BOOKS } from '../actions/filterBooks';

const initialState = [{
  filteredData: [],
}];
export default (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_BOOKS:
      return [{
        filteredData: action.data,
      }, ...state];
    default: return state;
  }
};
