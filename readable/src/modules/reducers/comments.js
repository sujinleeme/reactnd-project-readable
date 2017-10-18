import { FETCH_COMMENT_DATA_SUCCESS } from '../actions/comments'

export const comments = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_COMMENT_DATA_SUCCESS':
      return action.comments
    
    default:
      return state
  }
}
