export const SELECT_CATEGORY = 'SELECT_CATEGORY'
export const SELECT_TAB = 'SELECT_TAB'

export const selectCategory = ({ category }) => {
  return {
    type: SELECT_CATEGORY,
    category
  }
}

export const selectTab = ({ tab }) => {
  return {
    type: SELECT_TAB,
    tab
  }
}
