import { headers } from '../root/headers'
import { baseurl } from '../../api-server/configurl'

// Posts List selected by category
export const FETCH_POSTS = 'FETCH_POSTS'
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS'
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE'
export const RESET_POSTS = 'RESET_POSTS';


//Post
export const FETCH_POST = 'FETCH_POST'
export const FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS'
export const FETCH_POST_FAILURE = 'FETCH_POST_FAILURE'
export const RESET_ACTIVE_POST = 'RESET_ACTIVE_POST'
export const RESET_DELETED_POST = 'RESET_DELETED_POST'


//Comments
export const FETCH_COMMENTS = 'FETCH_COMMENTS'
export const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS'
export const FETCH_COMMENTS_FAILURE = 'FETCH_COMMENTS_FAILURE'
// export const RESET_DELETED_COMMENTS = 'RESET_DELETED_COMMENTS'

// single post
export const fetchPost = (post) => {
  return {
    type: 'FETCH_POST',
    payload: post,
  }
}

export const fetchPostSuccess = (activePost) => {
  return {
    type: FETCH_POST_SUCCESS,
    payload: activePost,
  }
}

export const fetchPostsFailure = (error) => {
  return {
    type: 'FETCH_POSTS_FAILURE',
    payload: error,
  }
}

export const resetActivePost = () =>{
  return {
    type: 'RESET_ACTIVE_POST'
  }
}

export function resetDeletedPost() {
  return {
    type: RESET_DELETED_POST
  }
}

// POSTS
export const fetchPosts = (request) => {
  return {
    type: 'FETCH_POSTS',
    payload: request,
  }
}

export const fetchPostsSuccess = (posts) => {
  return {
    type: 'FETCH_POSTS_SUCCESS',
    payload: posts,
  }
}

export const fetchPostFailure = (error) => {
  return {
    type: FETCH_POST_FAILURE,
    payload: error,
  }
}




export const fetchComments = (request) => {
  return {
    type: 'FETCH_POST_COMMENTS',
    payload: request,
  }
}

export const fetchCommentsSuccess = (error) => {
  return {
    type: 'FETCH_COMMENTS_SUCCESS',
    payload: error,
  }
}

export const fetchCommentsFailure = (comments) => {
  return {
    type: 'FETCH_COMMENTS_FAILURE',
    payload: comments,
  }
}


// combine actions
export const getPostLists = (category) => {
  return (dispatch) => {
    dispatch(fetchPosts())
    fetch(`${baseurl}/${category}/posts`, {headers}).
    then(response => {
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
    fetch(`${baseurl}/posts/${id}`, {headers}).
    then(response => {
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


export const getComments = (id) => {
  return (dispatch) => {
    dispatch(fetchComments())
    fetch(`${baseurl}/posts/${id}/comments`, {headers}).
    then((response) => {
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
    dispatch(resetActivePost());
    dispatch(resetDeletedPost());
  }
}





// export const resetActivePost = () =>{
//   return {
//     type: 'RESET_ACTIVE_POST'
//   }
// }
//
// export function resetDeletedPost() {
//   return {
//     type: RESET_DELETED_POST
//   }
// }



// option - String: Either "upVote" or "downVote"

export const voteIsUpdating = (bool) => {
  return {
    type: 'VOTE_IS_UPDATING',
    isUpdating: bool,
  }
}

export const voteUpdateSuccess = (bool) => {
  return {
    type: 'VOTE_UPDATE_SUCCESS',
    updated: bool,
  }
}

export const updateVote = (id, type) => {
  return (dispatch) => {
    dispatch(voteIsUpdating(true))
    
    fetch(`${baseurl}/posts/${id}`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({option: type}),
    }).
    then((response) => {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      dispatch(voteIsUpdating(false))
      return response
    }).
    then((response) => response.json()).
    catch(() => dispatch(voteUpdateSuccess(false)))
  }
}

//
// export const fetchPost = (id) => {
//   return (dispatch) => {
//     // dispatch(voteIsUpdating(true))
//
//     fetch(`${baseurl}/post/${id}`, {headers}).
//     then((response) => {
//       if (!response.ok) {
//         throw Error(response.statusText)
//       }
//       dispatch(fetchPostSuccess(response))
//       return response
//     })
//     .then((post) => dispatch(fetchPostSuccess(post)))
//     .catch(() => dispatch(fetchPostFailure(false)))
//   }
//
// }
