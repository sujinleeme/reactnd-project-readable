import { headers } from '../root/headers'
import { baseurl } from '../../api-server/configurl'

export const FETCH_COMMENT_DATA_SUCCESS = 'FETCH_COMMENT_DATA_SUCCESS'

export const fetchCommentDataSuccess = (comments) => {
  return {
    type: FETCH_COMMENT_DATA_SUCCESS,
    comments,
  }
}

export const getComments = (id) => {
  
  return (dispatch) => {
    fetch(`${baseurl}/posts/${id}/comments`, {headers}).
    then((response) => {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      return response
    }).then((response) => response.json()).
    then((data) => dispatch(fetchCommentDataSuccess(data)))
  }
}
