import {
  FETCH_POSTS,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
  RESET_POSTS,
  
  FETCH_POST,
  FETCH_POST_SUCCESS,
  FETCH_POST_FAILURE,
  RESET_ACTIVE_POST,
  
  CREATE_POST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
  RESET_NEW_POST,
  
  EDIT_POST,
  EDIT_POST_SUCCESS,
  EDIT_POST_FAILURE,
  
  FETCH_COMMENTS,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAILURE,
  
  UPDATE_VOTE_SCORE,
  
} from '../actions/posts'

const INITIAL_STATE = {
  postList: {
      posts: [],
      comments: [],
      error: null, loading: false,
  },
  newPost: {post: null, error: null, loading: false},
  activePost: {post: null, error: null, loading: false, init:true},
  deletedPost: {post: null, error: null, loading: false},
}

export function posts (state = INITIAL_STATE, action) {
  let error
  switch (action.type) {
    
    case FETCH_POSTS:// start fetching posts and set loading = true
      return {
        ...state,
        postList: {
            ...state.postList,
            error: null,
            loading: true
          },
      }
    case FETCH_POSTS_SUCCESS:// return list of posts and make loading = false
      return {
        ...state,
        postList: {
          ...state.postList,
          posts: action.payload,
          error: null,
          loading: false,
        },
      }
    case FETCH_POSTS_FAILURE:// return error and make loading = false
      error = action.payload //2nd one is network or server down errors ||
                             // {message: action.payload.message};
      return {
        ...state,
        postList: {
          post: action.payload, error: error, loading: false},
      }
    case RESET_POSTS:// reset postList to initial state
      return {...state, postList: {content: [], error: null, loading: false}}
    
    case FETCH_POST:
      return {
        ...state,
        activePost: {
          ...state.activePost, loading: true, voting: false, editing: false,
        },
      }
    
    case FETCH_POST_SUCCESS:
      return {
        ...state,
        activePost: {
          ...state.activePost, post: action.payload, error: null,
          loading: false,
        },
      }
    case FETCH_POST_FAILURE:
      error = action.payload
      return {
        ...state, activePost: {
          ...state.activePost, post: null, error: error, loading: false,
        },
      }
    
    case CREATE_POST:
      return {
        ...state, newPost: {
          ...state.newPost, post: action.payload, error: null, loading: false,
        },
      }
    case CREATE_POST_SUCCESS:
      return {
        ...state,
        newPost: {...state.newPost, post: action.payload, loading: true},
      }
    
    case CREATE_POST_SUCCESS:
      error = action.payload
      return {
        ...state,
        newPost: {
          ...state.newPost, post: null, error: error, loading: false,
        },
      }
    
    case EDIT_POST:
      return {
        ...state,
        activePost: {...state.activePost, loading: true, editing: true, init:false},
      }
    
    case EDIT_POST_SUCCESS:// return list of posts and make loading = false
      return {
        ...state,
        activePost: {...state.activePost, loading: true, editing: false, init:false},
      }
    case EDIT_POST_FAILURE:
      error = action.payload//2nd one is network or server down errors
      return {
        ...state,
        activePost: {...state.activePost, error: error, loading: false, init:false},
      }
    
    case RESET_ACTIVE_POST:
      return {
        ...state, activePost: {
          ...state.activePost, post: null, error: null, loading: false, init:true
        },
      }
    
    case FETCH_COMMENTS:
      return {
        ...state,
        activePost: {...state.activePost, comments: null, loading: true},
      }
    
    case FETCH_COMMENTS_SUCCESS:
      return {
        ...state, activePost: {
          ...state.activePost, comments: action.payload, error: null,
          loading: false,
        },
      }
    case FETCH_COMMENTS_FAILURE:
      error = action.payload//2nd one is network or server down errors
      return {
        ...state, activePost: {
          ...state.activePost, comments: null, error: error, loading: false,
        },
      }
    
    case UPDATE_VOTE_SCORE:
      return {
        ...state, activePost: {...state.activePost, voting: action.payload},
      }
    
    default:
      return state
  }
}