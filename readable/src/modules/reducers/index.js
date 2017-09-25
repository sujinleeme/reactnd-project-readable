import {
  SELECT_CATEGORY,
  SELECT_TAB,
} from '../actions/index'

const initSelectState = {
  tab: null,
  category: null,
}

const changeRoute = (state = initSelectState, action) => {
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

export default changeRoute
