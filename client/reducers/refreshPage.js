import { REFRESH_PAGE, UNDO_REFRESH_PAGE } from '../actions/refreshPage';

const initialState = [{
  isRefreshed: false,
}];
export default (state = initialState, action) => {
  switch (action.type) {
    case REFRESH_PAGE:
      return [{
        isRefreshed: true,
      }, ...state];
    case UNDO_REFRESH_PAGE:
      return [{
        isRefreshed: false,
      }, ...state];
    default:
      return state;
  }
};
