
import { refresh, undoRefresh } from '../../actions/refreshPage';


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
