import lodash from 'lodash'
import { filteredByCategory } from '../../actions/filterBooks'

/**
 * @export displayBooksByCategory
 * 
 * @description it dispatch actions to show books by category
 * 
 * @param {string} selectedCategory 
 * 
 * @param {object} data 
 * 
 * @returns {action} dispacted actions
 */
export default function displayBooksByCategory(selectedCategory, data) {
  const filteredData = lodash.filter(data, ['category', selectedCategory]);
  return (dispatch) => {
    dispatch(filteredByCategory(filteredData, selectedCategory));
  }
}
