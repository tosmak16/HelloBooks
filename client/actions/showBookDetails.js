export const NAVIGATE_TO_DETAILS_PAGE = 'NAVIGATE_TO_DETAILS_PAGE';

/**
 * @param {string} data 
 * @returns {object} of  book details state
 */
export const showBookDetails = (data) => {
  return {
    type: NAVIGATE_TO_DETAILS_PAGE,
    data
  };
}


