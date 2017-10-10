import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { currentMenu, categories, tabs, setupMenuComplete} from '../../menu/reducers/menu'
import { items, itemsHasErrored, itemsIsLoading, } from '../../menu/reducers/posts'

export default combineReducers({
  currentMenu,
  categories,
  tabs,
  items,
  itemsHasErrored,
  itemsIsLoading,
  setupMenuComplete,
  routerReducer,
})