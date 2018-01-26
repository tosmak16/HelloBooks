//Action types
export const ADD_CATEGORY_REQUEST = 'ADD_CATEGORY_REQUEST'
export const ADD_CATEGORY_SUCCESS = 'ADD_CATEGORY_SUCCESS'
export const ADD_CATEGORY_FAILURE = 'ADD_CATEGORY_FAILURE'

//Action creators
/**
 * @param {object} categoryData 
 * 
 * @returns {object} of add books category state
 */
export const addCategoryRequest = (categoryData) => {
  return {
    type: ADD_CATEGORY_REQUEST,
    isLoaded: 'waiting',
    categoryData
  }
}
/**
 * @param {string} responseMessage 
 * 
 * @returns {object} of add books category state
 */
export const addCategorySuccess = (responseMessage) => {
  return {
    type: ADD_CATEGORY_SUCCESS,
    isLoaded: 'true',
    responseMessage
  }
}
/**
 * @param {string} errorMessage 
 * 
 * @returns {object} of add books category state
 */
export const addCategoryError = (errorMessage) => {
  return {
    type: ADD_CATEGORY_FAILURE,
    isLoaded: 'false',
    errorMessage
  }
}
