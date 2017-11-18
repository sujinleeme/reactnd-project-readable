import { headers } from '../root/headers'
import { baseurl } from '../root/configurl'

import {
  FETCH_CATEGORY_DATA_SUCCESS,
  FETCH_TAB_DATA_SUCCESS,
  SELECT_CATEGORY,
  SELECT_TAB
} from '../actionTypes/menuTypes'

export const selectCategory = ({category}) => {
  return {
    type: SELECT_CATEGORY, category
  }
}

export const selectTab = ({tab}) => {
  return {
    type: SELECT_TAB, tab
  }
}

export const fetchCategoryDataSuccess = (categories) => {
  return {
    type: FETCH_CATEGORY_DATA_SUCCESS, categories
  }
}

export const fetchTabDataSuccess = (tabs) => {
  return {
    type: FETCH_TAB_DATA_SUCCESS, tabs
  }
}

export const getCategories = () => {
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

export const changeCategory = (category) => {
  return (dispatch) => {
    dispatch(selectCategory({category: category}))
  }
}

export const changeTab = (tab) => {
  return (dispatch) => {
    dispatch(selectTab({tab: tab}))
  }
}

export const getTabs = () => {
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