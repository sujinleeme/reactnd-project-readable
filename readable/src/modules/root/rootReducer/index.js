import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { currentMenu, categories, tabs, setupMenuComplete, postsIsEditing} from '../../reducers/menu'
import { posts, postsHasErrored, postsIsLoading, } from '../../reducers/posts'
import { comments } from '../../reducers/comments'

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