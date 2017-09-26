import NotFound from './pages/NotFound'
import HomePage from './pages/HomePage'

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import './index.css'

import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom'

import { composeWithDevTools } from 'redux-devtools-extension'

import { Provider, connect } from 'react-redux'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import reducers from './modules/reducers'


import createHistory from 'history/createBrowserHistory'
import registerServiceWorker from './registerServiceWorker'

import CustomTheme from './Theme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

// Create a history of your choosing (we're using a browser history in this
// case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

// Add the reducer to your store on the `router` key
const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if
  // needed
})

const store = createStore(
  reducers,
  
  composeEnhancers(
    applyMiddleware(middleware),
  ),
)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Router>
        <MuiThemeProvider theme={CustomTheme}>
          <Switch>
            <App />
          </Switch>
        </MuiThemeProvider>
      </Router>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
)
registerServiceWorker()