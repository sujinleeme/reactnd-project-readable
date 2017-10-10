import { headers } from '../headers'
import { baseurl } from '../../../api-server/configurl'
import { push } from 'react-router-redux'

export const FETCH_CATEGORY_DATA_SUCCESS = 'FETCH_CATEGORY_DATA_SUCCESS'
export const FETCH_TAB_DATA_SUCCESS = 'FETCH_TAB_DATA_SUCCESS'

export const SELECT_CATEGORY = 'SELECT_CATEGORY'
export const SELECT_TAB = 'SELECT_TAB'
export const SETUP_MENU_SUCCESS = 'SETUP_MENU_SUCCESS'

export const setupMenuComplete = (bool) => {
  return {
    type: SETUP_MENU_SUCCESS,
    hasloaded: bool,
  }
}

export const setupMenu = (categoryName, tabName) => {
  return (dispatch) => {
     Promise.all([
      dispatch(push(`/category/${categoryName}?=${tabName}`)),
      dispatch(selectCategory({category: categoryName})),
      dispatch(selectTab({tab: tabName}),
      )]).then((response) => {
      dispatch(setupMenuComplete(true))
    }).
    catch((failure) => dispatch(setupMenuComplete(false)))
  }
}


export const selectCategory = ({category}) => {
  return {
    type: SELECT_CATEGORY,
    category,
  }
}

export const selectTab = ({tab}) => {
  return {
    type: SELECT_TAB,
    tab,
  }
}

export const fetchCategoryDataSuccess = (categories) => {
  return {
    type: FETCH_CATEGORY_DATA_SUCCESS,
    categories,
  }
}

export const categoryFetchData = () => {
  return (dispatch) => {
    fetch(`${baseurl}/categories`, {headers}).
    then((response) => {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      return response
    }).
    then((response) => response.json()).
    then((data) => dispatch(fetchCategoryDataSuccess(data.categories)))
  }
}

export const fetchTabDataSuccess = (tabs) => {
  return {
    type: FETCH_TAB_DATA_SUCCESS,
    tabs,
  }
}

export const tabFetchData = () => {
  return (dispatch) => {
    fetch(`${baseurl}/tabs`, {headers}).
    then((response) => {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      return response
    }).
    then((response) => response.json()).
    then((data) => dispatch(fetchTabDataSuccess(data.tabs)))
  }
}

