import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import {
  SELECT_CATEGORY,
  SELECT_TAB,
} from '../actions'

const initSelectState = {
  tab: null,
  category: null,
}


const menu = (state = initSelectState, action) => {
  const {tab, category} = action
  
  switch (action.type) {
    case SELECT_CATEGORY:
      return {
        ...state,
        currentMenu : {
          [tab] : tab,
          [category]: category
        }
      }
    case SELECT_TAB:
      return {
        ...state,
        currentMenu : {
          [tab] : tab,
          [category]: category
        }
      }
    default :
      return state
    
  }
}

export default combineReducers({
  menu,
  routerReducer,
})
