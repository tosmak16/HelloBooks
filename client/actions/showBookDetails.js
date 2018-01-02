export const NAVIGATE_TO_DETAILS_PAGE = 'NAVIGATE_TO_DETAILS_PAGE';

/**
 * @export
 * @param {string} data 
 * @returns 
 */
export const showBookDetails = (data) => {
  return {
    type: NAVIGATE_TO_DETAILS_PAGE,
    data
  };
}


