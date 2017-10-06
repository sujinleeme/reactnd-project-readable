import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import './index.css'

import { BrowserRouter as Router, Switch } from 'react-router-dom'

import { composeWithDevTools } from 'redux-devtools-extension'

import { Provider } from 'react-redux'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import reducers from './modules/root/rootReducer'

import createHistory from 'history/createBrowserHistory'
import registerServiceWorker from './registerServiceWorker'

import CustomTheme from './Theme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

// Create a history of your choosing (we're using a browser history in this
// case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

// Add the reducer to your configStore on the `router` key
const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if
  // needed
})

export const store = createStore(
  reducers,
  
  composeEnhancers(
    applyMiddleware(middleware, thunk),
  ),
)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Router>
        <MuiThemeProvider theme={CustomTheme}>
          <Switch>
            <App store={store}/>
          </Switch>
        </MuiThemeProvider>
      </Router>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
)

registerServiceWorker()