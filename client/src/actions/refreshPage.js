
import { refresh, undoRefresh } from '../../actions/refreshPage';

/**
 * 
 * 
 * @export
 * @param {any} set 
 * @returns 
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
