import {
  SELECT_CATEGORY,
  SELECT_TAB,
  FETCH_CATEGORY_DATA_SUCCESS,
  FETCH_TAB_DATA_SUCCESS,
  SETUP_MENU_SUCCESS,
  CHANGE_EDIT_MENU,
} from '../actions/menu'

const initSelectState = {
  tab: null,
  category: null,
}

export const currentMenu = (state = initSelectState, action) => {
  const {tab, category} = action
  switch (action.type) {
    case SELECT_CATEGORY:
      return {
        ...state,
        category: category,
        
      }
    case SELECT_TAB:
      return {
        ...state,
        tab: tab,
      }
    
    default :
      return state
    
  }
}

export const categories = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_CATEGORY_DATA_SUCCESS':
      return action.categories
    
    default:
      return state
  }
}

export const tabs = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_TAB_DATA_SUCCESS':
      return action.tabs
    
    default:
      return state
  }
}

export const setupMenuComplete = (state = false, action) => {
  switch (action.type) {
    case 'SETUP_MENU_SUCCESS':
      return action.hasloaded
    
    default:
      return state
  }
}

export const postsIsEditing = (state = false, action) => {
  switch (action.type) {
    case 'CHANGE_EDIT_MENU':
      return action.isEditing
    
    default:
      return state
  }
}


