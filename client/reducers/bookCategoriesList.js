import {
  GET_CATEGORY_FAILURE,
  GET_CATEGORY_SUCCESS,
  GET_CATEGORY_REQUEST
} from '../actions/getCategories';

const initialState = [{
  categoryData: '',
  error: '',
  isLoaded: 'waiting',
}];
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORY_REQUEST:
      return [{
        categoryData: '',
        error: '',
        isLoaded: action.isLoaded,
      }, ...state];
    case GET_CATEGORY_SUCCESS:
      return [{
        categoryData: action.categoryData,
        error: '',
        isLoaded: action.isLoaded,
      }, ...state];
    case GET_CATEGORY_FAILURE:
      return [{
        errorMessage: action.errorMessage,
        categoryData: '',
        isLoaded: action.isLoaded,
      }, ...state];
    default:
      return state;
  }
};
