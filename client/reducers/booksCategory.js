import { ADD_CATEGORY_FAILURE, ADD_CATEGORY_SUCCESS, ADD_CATEGORY_REQUEST } from '../actions/addCategory';

const initialState = [{
  data: '',
  error: '',
  isLoaded: false,
  response: ''
}];
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_CATEGORY_REQUEST:
      return [{
        data: action.categoryData,
        error: '',
        isLoaded: action.isLoaded,
        response: ''
      }, ...state];
    case ADD_CATEGORY_SUCCESS:
      return [{
        responseMessage: action.responseMessage,
        data: '',
        error: '',
        isLoaded: action.isLoaded,
      }, ...state];
    case ADD_CATEGORY_FAILURE:
      return [{
        errorMessage: action.errorMessage,
        data: '',
        isLoaded: action.isLoaded,
        response: ''

      }, ...state];
    default:
      return state;
  }
};
