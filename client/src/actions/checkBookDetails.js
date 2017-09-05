import lodash from 'lodash'
import { browserHistory } from 'react-router';

import { showBookDetails } from '../../actions/showBookDetails';
import { countCheckedBooks } from '../../actions/counter';


let count = 0;

export default function checkBookDetails(bookId) {
  return (dispatch) => {

    dispatch(countCheckedBooks(count));
    dispatch(showBookDetails(bookId));
    count += 1;

  }


}
