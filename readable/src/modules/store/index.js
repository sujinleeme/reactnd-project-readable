import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers'


import multi from 'redux-multi'
import thunkMiddleware from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
// ...

const configureStore = (browserHistory) => {
  
  let middleware = [
    thunkMiddleware, // lets us dispatch() functions
    routerMiddleware(browserHistory), // <-- here I put createHistory() response/value
    multi
  ]
  
  return createStore(
    reducers,
    applyMiddleware(
      ...middleware
    ))
}

export default configureStore