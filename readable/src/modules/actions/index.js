export const SELECT_CATEGORY = 'SELECT_CATEGORY'
export const SELECT_TAB = 'SELECT_TAB'

export function selectCategory({ category }) {
  return {
    type: SELECT_CATEGORY,
    category
  }
}

export function selectTab({ tab }) {
  return {
    type: SELECT_TAB,
    tab
  }
}