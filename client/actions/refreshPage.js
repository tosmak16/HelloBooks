//Action types
export const REFRESH_PAGE = 'REFRESH_PAGE'
export const UNDO_REFRESH_PAGE = 'UNDO_REFRESH_PAGE'



//Action creators
export function refresh() {
  return {
    type: REFRESH_PAGE,
    isRefreshed: true,
  }
}

export function undoRefresh() {
  return {
    type: UNDO_REFRESH_PAGE,
    isRefreshed: false,
  }
}
