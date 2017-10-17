import lodash from 'lodash'

import { showBooksByCategory } from '../../actions/getFilteredBooks'

/**
 * 
 * 
 * @export
 * @param {any} selectedCategory 
 * @param {any} data 
 * @returns 
 */
export default function showbooksByCategory(selectedCategory, data) {
  const filteredData = lodash.filter(data, ['category', selectedCategory]);

  return (dispatch) => {
    dispatch(showBooksByCategory(filteredData, selectedCategory));
  }

}
