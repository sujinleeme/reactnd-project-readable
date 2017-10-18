import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { currentMenu, categories, tabs, setupMenuComplete, postsIsEditing} from '../../menu/reducers/menu'
import { posts, postsHasErrored, postsIsLoading, } from '../../menu/reducers/posts'
import { comments } from '../../menu/reducers/comments'

export default combineReducers({
  currentMenu,
  categories,
  tabs,
  postsIsEditing,
  posts,
  postsHasErrored,
  postsIsLoading,
  setupMenuComplete,
  comments,
  routerReducer,
})