import { REFRESH_PAGE, UNDO_REFRESH_PAGE } from '../actions/refreshPage';

const initialState = {
  isRefreshed: false,
};
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case REFRESH_PAGE:
      return {
        isRefreshed: true,
      };
    case UNDO_REFRESH_PAGE:
      return {
        isRefreshed: false,
      };
    default:
      return state;
  }
};
