import { headers } from '../headers'
import { baseurl } from '../../../api-server/configurl'

export const POSTS_HAS_ERRORED = 'POSTS_HAS_ERRORED'
export const POSTS_IS_LOADING = 'POSTS_IS_LOADING'
export const POSTS_FETCH_DATA_SUCCESS = 'POSTS_FETCH_DATA_SUCCESS'

export const postsHasErrored = (bool) => {
  return {
    type: 'POSTS_HAS_ERRORED',
    hasErrored: bool,
  }
}

export const postsIsLoading = (bool) => {
  return {
    type: 'POSTS_IS_LOADING',
    isLoading: bool,
  }
}

export const postsFetchDataSuccess = (posts) => {
  return {
    type: 'POSTS_FETCH_DATA_SUCCESS',
    posts,
  }
}

export const postsFetchData = (category) => {
  return (dispatch) => {
    dispatch(postsIsLoading(true))
    fetch(`${baseurl}/${category}/posts`, {headers}).
    then((response) => {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      dispatch(postsIsLoading(false))
      return response
    }).
    then((response) => response.json()).
    then((post) => dispatch(postsFetchDataSuccess(post))).
    catch(() => dispatch(postsHasErrored(true)))
  }
}
