//Action types
export const REFRESH_PAGE = 'REFRESH_PAGE'
export const UNDO_REFRESH_PAGE = 'UNDO_REFRESH_PAGE'

//Action creators
/**
 * @returns {object} of refreash page state
 */
export const refresh = () => {
  return {
    type: REFRESH_PAGE,
    isRefreshed: true,
  }
}
/**
 * @returns {object} of refreash page state
 */
export const undoRefresh = () => {
  return {
    type: UNDO_REFRESH_PAGE,
    isRefreshed: false,
  }
}
