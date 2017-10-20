import {
  FETCH_POSTS,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
  RESET_POSTS,
  
  FETCH_POST,
  FETCH_POST_SUCCESS,
  FETCH_POST_FAILURE,
  RESET_ACTIVE_POST,
  
  
  FETCH_COMMENTS,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAILURE,
  
  UPDATE_VOTE_SCORE

} from '../actions/posts'


const INITIAL_STATE = { postsList: {posts: [], error:null, loading: false},
  newPost:{post:null, error: null, loading: false},
  activePost:{post:null, error:null, loading: false},
  deletedPost: {post: null, error:null, loading: false},
};

export function posts(state = INITIAL_STATE, action) {
  let error;
  switch (action.type) {
    
    case FETCH_POSTS:// start fetching posts and set loading = true
      return {...state, postsList: {posts: [], error: null, loading: true}};
    case FETCH_POSTS_SUCCESS:// return list of posts and make loading = false
      return {
        ...state,
        postsList: {posts: action.payload, error: null, loading: false}
      };
    case FETCH_POSTS_FAILURE:// return error and make loading = false
      error = action.payload //2nd one is network or server down errors || {message: action.payload.message};
      return {...state, postsList: {posts: [], error: error, loading: false}};
    case RESET_POSTS:// reset postList to initial state
      return {...state, postsList: {posts: [], error: null, loading: false}};
    
    case FETCH_POST:
      return {...state, activePost: {...state.activePost, loading: true, voting:false}};

  
    case FETCH_POST_SUCCESS:
      return {
        ...state,
        activePost: {...state.activePost, post: action.payload, error: null, loading: false}
      };
    case FETCH_POST_FAILURE:
      error = action.payload//2nd one is network or server down errors
      return {...state, activePost: {...state.activePost, post: null, error: error, loading: false}};
    case RESET_ACTIVE_POST:
      return {...state, activePost: {...state.activePost, post: null, error: null, loading: false}};
      
      
    case FETCH_COMMENTS:
      return {...state, activePost: {...state.activePost,  comments: null, loading: true}};
  
    case FETCH_COMMENTS_SUCCESS:
      return {...state, activePost: {...state.activePost, comments:action.payload, error: null, loading: false}};
    case FETCH_COMMENTS_FAILURE:
      error = action.payload//2nd one is network or server down errors
      return {...state, activePost: {...state.activePost, comments:null, error: error, loading: false}};
    
      
    case UPDATE_VOTE_SCORE:
      return {...state, activePost: {...state.activePost, voting:action.payload}};
  
  
    default:
      return state;
  }
}



//
// export function postsHasErrored(state = false, action) {
//   switch (action.type) {
//     case 'POSTS_HAS_ERRORED':
//       return action.hasErrored;
//
//     default:
//       return state;
//   }
// }
//
// export function postsIsLoading(state = false, action) {
//   switch (action.type) {
//     case 'POSTS_IS_LOADING':
//       return action.isLoading;
//
//     default:
//       return state;
//   }
// }
//
// export function posts(state = [], action) {
//   switch (action.type) {
//     case 'POSTS_FETCH_DATA_SUCCESS':
//       return action.posts;
//
//     default:
//       return state;
//   }
// }
//
//
// export function voteIsUpdating(state = false, action) {
//   switch (action.type) {
//     case 'VOTE_IS_UPDATING':
//       return action.isUpdating;
//
//     default:
//       return state;
//   }
// }
//
//
// export function voteUpdateSuccess(state = false, action) {
//   switch (action.type) {
//     case 'VOTE_UPDATE_SUCCESS':
//       return action.updated;
//
//     default:
//       return state;
//   }
// }