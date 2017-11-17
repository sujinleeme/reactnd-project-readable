import history from './history'
import { routerMiddleware } from 'react-router-redux'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import thunk from 'redux-thunk'
import reducers from './modules/root/rootReducer'

const middlewareHistory = routerMiddleware(history)
const composeEnhancers = composeWithDevTools({})
const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(middlewareHistory, thunk)
  )
)

export default store