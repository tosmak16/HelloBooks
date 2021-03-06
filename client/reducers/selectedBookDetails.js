import { NAVIGATE_TO_DETAILS_PAGE } from '../actions/showBookDetails';

const initialState = [{
  bookId: '',
}];
export default (state = initialState, action) => {
  switch (action.type) {
    case NAVIGATE_TO_DETAILS_PAGE:
      return [{
        bookId: action.data,
      }, ...state];
    default: return state;
  }
};
