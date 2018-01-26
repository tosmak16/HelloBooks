//Action types
export const GET_CATEGORY_REQUEST = 'GET_CATEGORY_REQUEST'
export const GET_CATEGORY_SUCCESS = 'GET_CATEGORY_SUCCESS'
export const GET_CATEGORY_FAILURE = 'GET_CATEGORY_FAILURE'

//Action creators
/**
 * @returns {object} of get books category state
 */
export const getCategoryRequest = () => {
  return {
    type: GET_CATEGORY_REQUEST,
    isLoaded: 'waiting',
  }
}
/**
 * @param {string} categoryData 
 * 
 * @returns {object} of get books category state
 */
export const getCategorySuccess = (categoryData) => {
  return {
    type: GET_CATEGORY_SUCCESS,
    isLoaded: 'true',
    categoryData
  }
}
/**
 * @param {string} errorMessage 
 * 
 * @returns {object} of get books category state
 */
export const getCategoryError = (errorMessage) => {
  return {
    type: GET_CATEGORY_FAILURE,
    isLoaded: 'false',
    errorMessage
  }
}
