import { addCategorySuccess, addCategoryRequest, addCategoryError } from '../../actions//addCategory';

/** 
 * @export addBooksCategory
 * 
 * @description it dispatches actions for add Books Category request and response
 * 
 * @param {object} categoryName 
 * 
 * @param {string} token 
 * 
 * @returns {action} dispacted actions
 */
export const addBooksCategory = (categoryName, token) => {
  return async (dispatch) => {
    dispatch(addCategoryRequest(categoryName));
    const response = await fetch('/api/v2/categories', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        token: token
      },
      body: JSON.stringify({ categoryName })
    })
    const jsonResponse = await response.json().then(jsonRes => jsonRes)
    response.status === 201 ?
      dispatch(addCategorySuccess(jsonResponse.message)) :
      dispatch(addCategoryError(jsonResponse.message))
  }
}
export default addBooksCategory;
