import lodash from 'lodash'

import { showBooksByCategory } from '../../actions/getFilteredBooks'

/**
 * @export showbooksByCategory
 * @description it dispatch actions to show books by category
 * @param {string} selectedCategory 
 * @param {object} data 
 * @returns {action} dispacted actions
 */
export default function showbooksByCategory(selectedCategory, data) {
  const filteredData = lodash.filter(data, ['category', selectedCategory]);

  return (dispatch) => {
    dispatch(showBooksByCategory(filteredData, selectedCategory));
  }
}
