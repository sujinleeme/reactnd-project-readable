import { LOCATION_CHANGE } from 'react-router-redux';

import {
  SELECT_CATEGORY,
  SELECT_TAB,
  FETCH_CATEGORY_DATA_SUCCESS,
  FETCH_TAB_DATA_SUCCESS
} from '../actions/index'

const initSelectState = {
  tab: null,
  category: null
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
      return action.categories;
    
    default:
      return state;
  }
}


export const tabs = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_TAB_DATA_SUCCESS':
      return action.tabs;
    
    default:
      return state;
  }
}


//
// const initialLocation = { pathname: '/', search: '', hash: '' }
// export const locationReducer = (state = initialLocation, action) => {
//   return action.type === 'LOCATION_CHANGE' ?
//     action.location : state
// }

//
// export const locationReducer = (state=[], action) => {
//   switch (action.type) {
//     case LOCATION_CHANGE:
//       return  action.location
//     /*
//      action.payload is something like:
//      {
//      pathname: '/',
//      search: '',
//      hash: '',
//      state: null,
//      action: 'PUSH',
//      key: 'xwl8yl',
//      query: {},
//      $searchBase: {
//      search: '',
//      searchBase: ''
//      }
//      }
//      */
//
//     default:
//       return state
//   }
// }
//

