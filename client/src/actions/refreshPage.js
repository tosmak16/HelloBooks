
import { refresh, undoRefresh } from '../../actions/refreshPage';

/**
 * @export refreshPage
 * 
 * @description it dispatches actions to refresh page
 * 
 * @param {boolean} set 
 * 
 * @returns {action} dispacted actions
 */
export default function refreshPage(set) {
  return (dispatch) => {
    if (set) {
      dispatch(refresh());
    }
    else if (!set) {
      dispatch(undoRefresh());
    }
  };
}
