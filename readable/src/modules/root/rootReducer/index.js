import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import {
  currentMenu, categories, tabs, setupMenuComplete} from '../../reducers/menu'
import { posts } from '../../reducers/posts'
// posts, postsHasErrored, postsIsLoading, voteIsUpdating, voteUpdateSuccess,

import { comments } from '../../reducers/comments'

export default combineReducers({
  currentMenu,
  categories,
  tabs,
  setupMenuComplete,
  posts,
  // postsIsEditing,
  // postsHasErrored,
  // postsIsLoading,
  
  // comments,
  
  // voteIsUpdating,
  // voteUpdateSuccess,
  routerReducer,
})