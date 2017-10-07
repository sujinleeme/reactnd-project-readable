import history from './history';
import { routerMiddleware } from 'react-router-redux'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import thunk from 'redux-thunk'
import reducers from './modules/root/rootReducer'
const middleware = routerMiddleware(history)
const composeEnhancers = composeWithDevTools({

})
export default createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(middleware, thunk),
  ),
)