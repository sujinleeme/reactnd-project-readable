import {
  SELECT_CATEGORY,
  SELECT_TAB,
} from '../Actions'

const initSelectState = {
  tab: null,
  category: null,
}

function selection (state = initSelectState, action) {
  const {tab, category} = action
  switch (action.type) {
    case SELECT_CATEGORY:
      return {
        ...state,
        tab,
        category
      }
    case SELECT_TAB:
      return {
        ...state,
        tab,
        category
      }
    default :
      return state
    
  }
}

export default selection
