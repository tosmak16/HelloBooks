//Action types
export const REFRESH_PAGE = 'REFRESH_PAGE'
export const UNDO_REFRESH_PAGE = 'UNDO_REFRESH_PAGE'



//Action creators
/**
 * 
 * 
 * @export
 * @returns 
 */
export function refresh() {
  return {
    type: REFRESH_PAGE,
    isRefreshed: true,
  }
}
/**
 * 
 * 
 * @export
 * @returns 
 */
export function undoRefresh() {
  return {
    type: UNDO_REFRESH_PAGE,
    isRefreshed: false,
  }
}
