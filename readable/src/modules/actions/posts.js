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

//Create Post
export const CREATE_POST = 'CREATE_POST';
export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';
export const CREATE_POST_FAILURE = 'CREATE_POST_FAILURE';
export const RESET_NEW_POST = 'RESET_NEW_POST';


//Edit Post
export const EDIT_POST = 'EDIT_POST'
export const EDIT_POST_SUCCESS = 'EDIT_POST_SUCCESS'
export const EDIT_POST_FAILURE = 'EDIT_POST_FAILURE'


// Vote
export const UPDATE_VOTE_SCORE = 'UPDATE_VOTE_SCORE'

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
    type: 'RESET_DELETED_POST'
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
    type: 'FETCH_POST_FAILURE',
    payload: error,
  }
}

//createPOst
export function createPost(request) {
  return {
    type: 'CREATE_POST',
    payload: request
  };
}


export const createPostSuccess = (newPost) => {
  return {
    type: 'CREATE_POST_SUCCESS',
    payload: newPost
  };
}

export const createPostFailure = (error) => {
  return {
    type: 'CREATE_POST_FAILURE',
    payload: error
  };
}


export const addNewPost = (id, type) => {
  return (dispatch) => {
    fetch(`${baseurl}/posts/${id}`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({option: type}),
    }).
    then((response) => {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      dispatch(updateVoteScore(true))
      return response
    }).
    then((response) => response.json()).
    catch(() => dispatch(voteUpdateSuccess(false)))
  }
}


// comments
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


// Vote
export const updateVoteScore = (bool) => {
  return {
    type: 'UPDATE_VOTE_SCORE',
    payload: bool,
  }
}

export const voteUpdateSuccess = (bool) => {
  return {
    type: 'VOTE_UPDATE_SUCCESS',
    updated: bool,
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


export const updateVote = (id, type) => {
  return (dispatch) => {
    
    fetch(`${baseurl}/posts/${id}`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({option: type}),
    }).
    then((response) => {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      dispatch(updateVoteScore(true))
      return response
    }).
    then((response) => response.json()).
    catch(() => dispatch(voteUpdateSuccess(false)))
  }
}





// EDIT POST
export const editPost = (request) => {
  return {
    type: 'EDIT_POST',
    payload: request,
  }
}

export const editPostSuccess = (post) => {
  return {
    type: 'EDIT_POST_SUCCESS',
    payload: post,
  }
}

export const editPostFailure = (error) => {
  return {
    type: 'EDIT_POST_FAILURE',
    payload: error,
  }
}
    
export const updatePostContent = (id, content) => {
  return (dispatch) => {
    dispatch(editPost())
    fetch(`${baseurl}/posts/${id}`, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(content),
    }).
    then((response) => {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      dispatch(editPostSuccess(true))
      return response
    })
    .then((response) => response.json())
    .then((post) => dispatch(editPostSuccess(post)))
    .catch(() => dispatch(editPostFailure()))
  }
}



    