import { getCategorySuccess, getCategoryRequest, getCategoryError } from '../../actions//getCategories';

/** 
 * @export getBooksCategory
 * 
 * @description it dispatches actions for get Books Category request and response
 * 
 * @param {object} categoryName 
 * 
 * @param {string} token 
 * 
 * @returns {action} dispacted actions
 */
export const getBooksCategory = (token) => {
  return async (dispatch) => {
    dispatch(getCategoryRequest());
    const response = await fetch('/api/v2/categories', {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        token: token
      }
    })
    const jsonResponse = await response.json().then(jsonRes => jsonRes)
    response.status === 200 ?
      dispatch(getCategorySuccess(jsonResponse.bookCategories)) :
      dispatch(getCategoryError(jsonResponse.message))
  }
}
export default getBooksCategory;
