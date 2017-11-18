import { headers } from '../root/headers'
import { baseurl } from '../root/configurl'

import { sortLists } from '../../utils/utils'

import {

  FETCH_POSTS, FETCH_POSTS_SUCCESS, FETCH_POSTS_FAILURE,

  FETCH_COMMENTS_COUNTER, SORT_POSTS_SUCCESS,

  RESET_FETCH_POSTS,

  FETCH_POST, FETCH_POST_SUCCESS, FETCH_POST_FAILURE, RESET_ACTIVE_POST,

  EDIT_POST, EDIT_POST_SUCCESS, EDIT_POST_FAILURE,

  CREATE_POST, CREATE_POST_SUCCESS, CREATE_POST_FAILURE,

  DELETE_POST, DELETE_POST_SUCCESS, DELETE_POST_FAILURE, RESET_DELETED_POST,

  UPDATE_POST_VOTE_SCORE, UPDATE_POST_VOTE_SCORE_FAILURE,

  CREATE_COMMENT, CREATE_COMMENT_SUCCESS, CREATE_COMMENT_FAILURE,

  FETCH_COMMENT, FETCH_COMMENT_SUCCESS, FETCH_COMMENT_FAILURE,

  DELETE_COMMENT, DELETE_COMMENT_SUCCESS, DELETE_COMMENT_FAILURE,

  EDIT_COMMENT, EDIT_COMMENT_SUCCESS, EDIT_COMMENT_FAILURE,

  FETCH_COMMENTS, FETCH_COMMENTS_SUCCESS, FETCH_COMMENTS_FAILURE,

  UPDATE_COMMENT_VOTE_SCORE_SUCCESS, UPDATE_COMMENT_VOTE_SCORE_FAILURE

} from '../actionTypes/postsTypes'

export const resetFetchPost = (init) => {
  return {
    type: RESET_FETCH_POSTS, payload: init
  }
}

export const fetchPost = (post) => {
  return {
    type: FETCH_POST, payload: post
  }
}

export const fetchPostSuccess = (activePost) => {
  return {
    type: FETCH_POST_SUCCESS, payload: activePost
  }
}

export const fetchPostsFailure = (error) => {
  return {
    type: FETCH_POSTS_FAILURE, payload: error
  }
}

export const resetActivePost = () => {
  return {
    type: RESET_ACTIVE_POST
  }
}

export function resetDeletedPost () {
  return {
    type: RESET_DELETED_POST
  }
}

export const fetchPosts = (request) => {
  return {
    type: FETCH_POSTS, payload: request
  }
}

export const fetchPostsSuccess = (post) => {
  return {
    type: FETCH_POSTS_SUCCESS, payload: post
  }
}

export const sortPosts = (option, posts) => {
  const sortedPost = sortLists(option, posts)
  return {
    type: SORT_POSTS_SUCCESS, payload: sortedPost, sortType: option
  }
}

export const fetchPostFailure = (error) => {
  return {
    type: FETCH_POST_FAILURE, payload: error
  }
}

export const editPost = (request) => {
  return {
    type: EDIT_POST, payload: request
  }
}

export const editPostSuccess = (bool) => {
  return {
    type: EDIT_POST_SUCCESS, payload: bool
  }
}

export const editPostFailure = (error) => {
  return {
    type: EDIT_POST_FAILURE, payload: error
  }
}

export const updatePostVoteScore = (bool) => {
  return {
    type: UPDATE_POST_VOTE_SCORE, payload: bool
  }
}

export const updatePostVoteScoreFailure = (error) => {
  return {
    type: UPDATE_POST_VOTE_SCORE_FAILURE, payload: error
  }
}

export function createPost (request) {
  return {
    type: CREATE_POST, payload: request
  }
}

export const createPostSuccess = (newPost) => {
  return {
    type: CREATE_POST_SUCCESS, payload: newPost
  }
}

export const createPostFailure = (error) => {
  return {
    type: CREATE_POST_FAILURE, payload: error
  }
}

export const deletePost = (request) => {
  return {
    type: DELETE_POST, payload: request
  }
}

export const deletePostSuccess = (post) => {
  return {
    type: DELETE_POST_SUCCESS, payload: post
  }
}

export const deletePostFailure = (error) => {
  return {
    type: DELETE_POST_FAILURE, payload: error
  }
}

export const fetchCommentsCounter = (comments, id) => {
  return {
    type: FETCH_COMMENTS_COUNTER, payload: comments, id: id
  }
}

export const fetchComments = (request) => {
  return {
    type: FETCH_COMMENTS, payload: request
  }
}

export const fetchCommentsFailure = (error) => {
  return {
    type: FETCH_COMMENTS_FAILURE, payload: error
  }
}

export const fetchCommentsSuccess = (comments) => {
  const sortedComments = sortLists('new', comments)
  return {
    type: FETCH_COMMENTS_SUCCESS, payload: sortedComments
  }
}

export function createComment (request) {
  return {
    type: CREATE_COMMENT, payload: request
  }
}

export const createCommentSuccess = (newComment) => {
  return {
    type: CREATE_COMMENT_SUCCESS, payload: newComment
  }
}

export const createCommentFailure = (error) => {
  return {
    type: CREATE_COMMENT_FAILURE, payload: error
  }
}

export const fetchComment = (post) => {
  return {
    type: FETCH_COMMENT, payload: post
  }
}

export const fetchCommentSuccess = (activePost) => {
  return {
    type: FETCH_COMMENT_SUCCESS, payload: activePost
  }
}

export const fetchCommentFailure = (error) => {
  return {
    type: FETCH_COMMENT_FAILURE, payload: error
  }
}

export const editComment = (request) => {
  return {
    type: EDIT_COMMENT, payload: request
  }
}

export const editCommentSuccess = (bool) => {
  return {
    type: EDIT_COMMENT_SUCCESS, payload: bool
  }
}

export const editCommentFailure = (error) => {
  return {
    type: EDIT_COMMENT_FAILURE, payload: error
  }
}

export const updateCommentVoteScoreSuccess = (bool, comment) => {
  return {
    type: UPDATE_COMMENT_VOTE_SCORE_SUCCESS, payload: bool, comment: comment
  }
}

export const updateCommentVoteScoreFailure = (error) => {
  return {
    type: UPDATE_COMMENT_VOTE_SCORE_FAILURE, payload: error
  }
}

export const deleteComment = (request) => {
  return {
    type: DELETE_COMMENT, payload: request
  }
}

export const deleteCommentSuccess = (comment) => {
  return {
    type: DELETE_COMMENT_SUCCESS, payload: comment
  }
}

export const deleteCommentFailure = (error) => {
  return {
    type: DELETE_COMMENT_FAILURE, payload: error
  }
}

export const createNewPost = (content, category, tab) => {
  return (dispatch) => {
    dispatch(createPost())
    fetch(`${baseurl}/posts/`, {
      method: 'POST', headers: headers, body: JSON.stringify(content)
    }).
    then((response) => {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      return response
    }).
    then((response) => response.json()).
    then((post) => dispatch(createPostSuccess(post))).
    then((post) => dispatch(getPosts(category, tab))).
    catch((err) => dispatch(createPostFailure(err)))
  }
}

export const createNewComment = (content, id) => {
  return (dispatch) => {
    dispatch(createComment())
    fetch(`${baseurl}/comments/`, {
      method: 'POST', headers: headers, body: JSON.stringify(content)
    }).
    then((response) => {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      return response
    }).
    then((response) => response.json()).
    then((post) => dispatch(createCommentSuccess(post))).
    then((post) => dispatch(getComments(id))).
    catch((err) => dispatch(createCommentFailure(err)))
  }
}

export const resetPosts = () => {
  return (dispatch) => {
    dispatch(resetFetchPost())
  }
}

export const getAllPosts = (tab) => {
  return (dispatch) => {
    dispatch(fetchPosts())
    fetch(`${baseurl}/posts`, {headers}).
    then(response => {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      return response
    }).
    then((response) => response.json()).
    then((posts) => dispatch(fetchPostsSuccess(tab, posts))).
    catch(() => dispatch(fetchPostsFailure()))
  }
}

export const getPosts = (category, sortType) => {
  return (dispatch) => {
    dispatch(fetchPosts())
    let url
    if (category === 'all') {
      url = `${baseurl}/posts`
    }
    else {
      url = `${baseurl}/${category}/posts`
    }
    fetch(url, {headers}).
    then(response => {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      return response
    }).
    then((response) => response.json()).
    then((posts) => dispatch(sortPosts(sortType, posts))).
    catch((err) => dispatch(fetchPostsFailure(err)))
  }
}

export const getPost = (id) => {
  return (dispatch) => {
    dispatch(fetchPost())
    fetch(`${baseurl}/posts/${id}`, {headers}).
    then(response => {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      return response
    }).
    then((response) => response.json()).
    then((post) => dispatch(fetchPostSuccess(post))).
    catch((err) => dispatch(fetchPostFailure(err)))
  }
}

export const getComment = (id) => {
  return (dispatch) => {
    dispatch(fetchComment())
    fetch(`${baseurl}/comments/${id}`, {headers}).
    then(response => {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      return response
    }).
    then((response) => response.json()).
    then((post) => dispatch(fetchCommentSuccess(post))).
    catch((err) => dispatch(fetchCommentFailure(err)))
  }
}

export const getComments = (id) => {
  return (dispatch) => {
    dispatch(fetchComments())
    fetch(`${baseurl}/posts/${id}/comments`, {headers}).
    then((response) => {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      return response
    }).
    then((response) => response.json()).
    then((comments) => dispatch(fetchCommentsSuccess(comments))).
    catch((err) => dispatch(fetchCommentsFailure(err))).
    then((comments) => dispatch(fetchCommentsCounter(comments, id)))
  }
}

export const resetPost = () => {
  return (dispatch) => {
    dispatch(resetActivePost())
    dispatch(resetDeletedPost())
  }
}

export const updatePostVoter = (id, type) => {
  return (dispatch) => {
    fetch(`${baseurl}/posts/${id}`, {
      method: 'POST', headers: headers, body: JSON.stringify({option: type})
    }).
    then((response) => {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      dispatch(updatePostVoteScore(true))
      return response
    }).
    then((response) => response.json()).
    then((response) => dispatch(getPost(id))).
    catch((err) => dispatch(updatePostVoteScoreFailure(err)))
  }
}

export const updatePostContent = (id, content) => {
  return (dispatch) => {
    dispatch(editPost())
    fetch(`${baseurl}/posts/${id}`, {
      method: 'PUT', headers: headers, body: JSON.stringify(content)
    }).
    then((response) => {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      dispatch(editPostSuccess(true))
      return response
    }).
    then((response) => response.json()).
    then((post) => dispatch(getPost(id))).
    catch((err) => dispatch(editPostFailure(err)))
  }
}

export const updateAllPostContent = (id, content, category, tab) => {
  return (dispatch) => {
    dispatch(editPost())
    fetch(`${baseurl}/posts/${id}`, {
      method: 'PUT', headers: headers, body: JSON.stringify(content)
    }).
    then((response) => {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      dispatch(editPostSuccess(true))
      return response
    }).
    then((response) => response.json()).
    then((post) => dispatch(getPosts(category, tab))).
    catch((err) => dispatch(editPostFailure(err)))
  }
}

export const deletePostsAllUpdate = (id, category, tab) => {
  return (dispatch) => {
    dispatch(deletePost())
    fetch(`${baseurl}/posts/${id}`, {
      method: 'PUT', headers: headers, body: JSON.stringify({deleted: true})
    }).
    then((response) => {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      dispatch(deletePostSuccess(true))
      return response
    }).
    then((response) => response.json()).
    then((post) => dispatch(getPosts(category, tab))).
    catch((err) => dispatch(deletePostFailure(err)))

  }
}

export const deletePostContent = (id) => {
  return (dispatch) => {
    dispatch(deletePost())
    fetch(`${baseurl}/posts/${id}`, {
      method: 'PUT', headers: headers, body: JSON.stringify({deleted: true})
    }).
    then((response) => {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      dispatch(deletePostSuccess(true))
      return response
    }).
    then((response) => response.json()).
    catch((err) => dispatch(deletePostFailure(err)))
  }
}

export const deleteCommentContent = (id, category, parentId) => {
  return (dispatch) => {
    dispatch(deleteComment())
    fetch(`${baseurl}/comments/${id}`, {
      method: 'PUT', headers: headers, body: JSON.stringify({deleted: true})
    }).
    then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      dispatch(deleteCommentSuccess(true))
      return response
    }).
    then((response) => response.json()).
    then(() => dispatch(getComments(parentId))).
    catch((err) => dispatch(deleteCommentFailure(err)))
  }
}

export const updateCommentContent = (id, content, parentId) => {
  return (dispatch) => {
    dispatch(editComment())
    fetch(`${baseurl}/comments/${id}`, {
      method: 'PUT', headers: headers, body: JSON.stringify(content)
    }).
    then((response) => {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      dispatch(editCommentSuccess(true))
      return response
    }).
    then((response) => response.json()).
    then((response) => dispatch(getComment(id))).
    then((response) => dispatch(getComments(parentId))).
    catch((err) => dispatch(editCommentFailure(err)))
  }
}

export const updateCommentVoter = (id, type, parentId) => {
  return (dispatch) => {
    fetch(`${baseurl}/comments/${id}`, {
      method: 'POST', headers: headers, body: JSON.stringify({option: type})
    }).
    then((response) => {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      return response
    }).
    then((response) => response.json()).
    then((post) => dispatch(updateCommentVoteScoreSuccess(true, post))).
    catch((err) => dispatch(updateCommentVoteScoreFailure(err))).
    then(() => dispatch(getComments(parentId)))
  }
}
