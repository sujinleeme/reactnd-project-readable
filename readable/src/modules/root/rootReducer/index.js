import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { currentMenu, categories, tabs } from '../../menu/reducers'

export default combineReducers({
  currentMenu,
  categories,
  tabs,
  routerReducer,
})