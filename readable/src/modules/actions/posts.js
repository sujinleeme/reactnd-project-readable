import { headers } from '../root/headers'
import { baseurl } from '../../api-server/configurl'

// Posts List selected by category
export const FETCH_POSTS = 'FETCH_POSTS'
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS'
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE'
export const RESET_POSTS = 'RESET_POSTS'

//Post
export const FETCH_POST = 'FETCH_POST'
export const FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS'
export const FETCH_POST_FAILURE = 'FETCH_POST_FAILURE'
export const RESET_ACTIVE_POST = 'RESET_ACTIVE_POST'
export const RESET_DELETED_POST = 'RESET_DELETED_POST'

//Create Post
export const CREATE_POST = 'CREATE_POST'
export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS'
export const CREATE_POST_FAILURE = 'CREATE_POST_FAILURE'
export const RESET_NEW_POST = 'RESET_NEW_POST'

//Edit Post
export const EDIT_POST = 'EDIT_POST'
export const EDIT_POST_SUCCESS = 'EDIT_POST_SUCCESS'
export const EDIT_POST_FAILURE = 'EDIT_POST_FAILURE'

//Delete Post
export const DELETE_POST = 'DELETE_POST'
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS'
export const DELETE_POST_FAILURE = 'DELETE_POST_FAILURE'

// Vote
export const UPDATE_VOTE_SCORE = 'UPDATE_VOTE_SCORE'


//COMMENT
export const FETCH_COMMENT = 'FETCH_COMMENT'
export const FETCH_COMMENT_SUCCESS = 'FETCH_COMMENT_SUCCESS'
export const FETCH_COMMENT_FAILURE = 'FETCH_COMMENT_FAILURE'




//Comments
export const FETCH_COMMENTS = 'FETCH_COMMENTS'
export const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS'
export const FETCH_COMMENTS_FAILURE = 'FETCH_COMMENTS_FAILURE'
export const SORT_COMMENTS_SUCCESS = 'SORT_COMMENTS_SUCCESS'

// New Comments
export const CREATE_COMMENT = 'CREATE_COMMENT'
export const CREATE_COMMENT_SUCCESS = 'CREATE_COMMENT_SUCCESS'
export const CREATE_COMMENT_FAILURE = 'CREATE_COMMENT_FAILURE'
export const RESET_NEW_COMMENT = 'RESET_NEW_COMMENT'

// single post
export const fetchPost = (post) => {
  return {
    type: 'FETCH_POST', payload: post,
  }
}

export const fetchPostSuccess = (activePost) => {
  return {
    type: 'FETCH_POST_SUCCESS', payload: activePost,
  }
}

export const fetchPostsFailure = (error) => {
  return {
    type: 'FETCH_POSTS_FAILURE', payload: error,
  }
}

export const resetActivePost = () => {
  return {
    type: 'RESET_ACTIVE_POST',
  }
}

export function resetDeletedPost () {
  return {
    type: 'RESET_DELETED_POST',
  }
}

// POSTS
export const fetchPosts = (request) => {
  return {
    type: 'FETCH_POSTS', payload: request,
  }
}

export const fetchPostsSuccess = (posts) => {
  const sortedPosts = sortLists('new', posts)
  
  return {
    type: 'FETCH_POSTS_SUCCESS', payload: sortedPosts,
  }
}

export const fetchPostFailure = (error) => {
  return {
    type: 'FETCH_POST_FAILURE', payload: error,
  }
}

export function createPost (request) {
  return {
    type: 'CREATE_POST', payload: request,
  }
}

export const createPostSuccess = (newPost) => {
  return {
    type: 'CREATE_POST_SUCCESS', payload: newPost,
  }
}

export const createPostFailure = (error) => {
  return {
    type: 'CREATE_POST_FAILURE', payload: error,
  }
}

export const createNewPost = (content, category) => {
  return (dispatch) => {
    dispatch(createPost())
    fetch(`${baseurl}/posts/`, {
      method: 'POST', headers: headers, body: JSON.stringify(content),
    }).then((response) => {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      return response
    })
    .then((response) => response.json())
    .then((post) => dispatch(createPostSuccess(post)))
    .then((post) => dispatch(getPostLists(category)))
    .catch(() => dispatch(createPostFailure()))
  }
}

// comments
export const fetchComments = (request) => {
  return {
    type: 'FETCH_COMMENTS', payload: request,
  }
}

export const fetchCommentsFailure = (error) => {
  return {
    type: 'FETCH_COMMENTS_FAILURE', payload: error,
  }
}

export const fetchCommentsSuccess = (comments) => {
  const sortedComments = sortLists('new', comments)
  
  return {
    type: 'FETCH_COMMENTS_SUCCESS', payload: sortedComments,
  }
}

function sortLists (sorting, posts) {
  return posts.sort((a, b) => {
    if (sorting === 'new') {
      return b.timestamp - a.timestamp
    }
    if (sorting === 'voteSore') {
      return b.voteScore - a.voteScore
    }
  })
}

export const sortCommentsSuccess = (comments) => {
  const sortedComments = sortLists('new', comments)
  return {
    type: 'SORT_COMMENTS_SUCCESS', payload: sortedComments,
  }
}

//createComment
export function createComment (request) {
  return {
    type: 'CREATE_COMMENT', payload: request,
  }
}

export const createCommentSuccess = (newComment) => {
  return {
    type: 'CREATE_COMMENT_SUCCESS', payload: newComment,
  }
}

export const createCommentFailure = (error) => {
  return {
    type: 'CREATE_COMMENT_FAILURE', payload: error,
  }
}

export const fetchComment = (post) => {
  return {
    type: 'FETCH_COMMENT', payload: post,
  }
}

export const fetchCommentSuccess = (activePost) => {
  return {
    type: FETCH_COMMENT_SUCCESS, payload: activePost,
  }
}

export const fetchCommentFailure = (error) => {
  return {
    type: 'FETCH_COMMENT_FAILURE', payload: error,
  }
}


// EDIT COMMENT
export const editComment = (request) => {
  return {
    type: 'EDIT_COMMENT', payload: request,
  }
}

export const editCommentSuccess = (post) => {
  return {
    type: 'EDIT_COMMENT_SUCCESS', payload: post,
  }
}

export const editCommentFailure = (error) => {
  return {
    type: 'EDIT_COMMENT_FAILURE', payload: error,
  }
}

export const updateCommentContent = (id, content) => {
  return (dispatch) => {
    dispatch(editComment())
    fetch(`${baseurl}/comments/${id}`, {
      method: 'PUT', headers: headers, body: JSON.stringify(content),
    }).then((response) => {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      dispatch(editCommentSuccess(true))
      return response
    })
    .then((response) => response.json())
    .catch(() => dispatch(editCommentFailure()))
  }
}


export const createNewComment = (content, id) => {
  return (dispatch) => {
    dispatch(createComment())
    fetch(`${baseurl}/comments/`, {
      method: 'POST', headers: headers, body: JSON.stringify(content),
    }).then((response) => {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      return response
    })
    .then((response) => response.json())
    .then((post) => dispatch(createCommentSuccess(post)))
    .then((post) => dispatch(getComments(id)))
    .catch(() => dispatch(createCommentFailure()))
  }
}

// Vote
export const updateVoteScore = (bool) => {
  return {
    type: 'UPDATE_VOTE_SCORE', payload: bool,
  }
}

export const voteUpdateSuccess = (bool) => {
  return {
    type: 'VOTE_UPDATE_SUCCESS', updated: bool,
  }
}

// combine actions
export const getPostLists = (category) => {
  return (dispatch) => {
    dispatch(fetchPosts())
    fetch(`${baseurl}/${category}/posts`, {headers}).then(response => {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      return response
    })
    .then((response) => response.json())
    .then((posts) => dispatch(fetchPostsSuccess(posts)))
    .catch(() => dispatch(fetchPostsFailure()))
  }
}

export const getPost = (id) => {
  return (dispatch) => {
    dispatch(fetchPost())
    fetch(`${baseurl}/posts/${id}`, {headers}).then(response => {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      return response
    })
    .then((response) => response.json())
    .then((post) => dispatch(fetchPostSuccess(post)))
    .catch((response) => dispatch(fetchPostFailure()))
  }
}

export const getComment = (id) => {
  return (dispatch) => {
    dispatch(fetchComment())
    fetch(`${baseurl}/comments/${id}`, {headers}).then(response => {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      return response
    })
    .then((response) => response.json())
    .then((post) => dispatch(fetchCommentSuccess(post)))
    .catch((response) => dispatch(fetchCommentFailure()))
  }
}

export const getComments = (id) => {
  return (dispatch) => {
    dispatch(fetchComments())
    fetch(`${baseurl}/posts/${id}/comments`, {headers}).then((response) => {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      return response
    }).then((response) => response.json())
    
    .then((comments) => dispatch(fetchCommentsSuccess(comments)))
    .catch((response) => dispatch(fetchCommentsFailure()))
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
      method: 'POST', headers: headers, body: JSON.stringify({option: type}),
    })
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      dispatch(updateVoteScore(true))
      return response
    })
    .then((response) => response.json())
    .catch(() => dispatch(voteUpdateSuccess(false)))
  }
}

// EDIT POST
export const editPost = (request) => {
  return {
    type: 'EDIT_POST', payload: request,
  }
}

export const editPostSuccess = (post) => {
  return {
    type: 'EDIT_POST_SUCCESS', payload: post,
  }
}

export const editPostFailure = (error) => {
  return {
    type: 'EDIT_POST_FAILURE', payload: error,
  }
}

export const updatePostContent = (id, content) => {
  return (dispatch) => {
    dispatch(editPost())
    fetch(`${baseurl}/posts/${id}`, {
      method: 'PUT', headers: headers, body: JSON.stringify(content),
    }).then((response) => {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      dispatch(editPostSuccess(true))
      return response
    })
    .then((response) => response.json())
    .catch(() => dispatch(editPostFailure()))
  }
}

// DELETE POST
export const deletePost = (request) => {
  return {
    type: 'DELETE_POST', payload: request,
  }
}

export const deletePostSuccess = (post) => {
  return {
    type: 'DELETE_POST_SUCCESS', payload: post,
  }
}

export const deletePostFailure = (error) => {
  return {
    type: 'DELETE_POST_FAILURE', payload: error,
  }
}

export const deletePostContent = (id) => {
  return (dispatch) => {
    dispatch(deletePost())
    fetch(`${baseurl}/posts/${id}`, {
      method: 'PUT', headers: headers, body: JSON.stringify({deleted: true}),
    }).then((response) => {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      dispatch(deletePostSuccess(true))
      return response
    })
    .then((response) => response.json())
    .catch(() => dispatch(deletePostFailure()))
  }
}



// DELETE POST
export const deleteComment = (request) => {
  return {
    type: 'DELETE_COMMENT', payload: request,
  }
}

export const deleteCommentSuccess = (comment) => {
  return {
    type: 'DELETE_COMMENT_SUCCESS', payload: comment,
  }
}

export const deleteCommentFailure = (error) => {
  return {
    type: 'DELETE_COMMENT_FAILURE', payload: error,
  }
}

export const deleteCommentContent = (id) => {
  return (dispatch) => {
    dispatch(deleteComment())
    fetch(`${baseurl}/comments/${id}`, {
      method: 'PUT', headers: headers, body: JSON.stringify({deleted: true}),
    }).then((response) => {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      dispatch(deletePostSuccess(true))
      return response
    })
    .then((response) => response.json())
    .catch(() => dispatch(deleteCommentFailure()))
  }
}


export const updateCommentVoter = (id, type) => {
  return (dispatch) => {
    fetch(`${baseurl}/comments/${id}`, {
      method: 'POST', headers: headers, body: JSON.stringify({option: type}),
    })
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      dispatch(updateVoteScore(true))
      return response
    })
    .then((response) => response.json())
    .catch(() => dispatch(voteUpdateSuccess(false)))
  }
}
