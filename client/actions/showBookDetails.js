export const NAVIGATE_TO_DETAILS_PAGE = 'NAVIGATE_TO_DETAILS_PAGE';


export function showBookDetails(data) {
  return {
    type: NAVIGATE_TO_DETAILS_PAGE,
    data
  };
}


