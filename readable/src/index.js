
import NotFound from './pages/NotFound'
import HomePage from './pages/HomePage'

import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom'

import CustomTheme from './Theme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import registerServiceWorker from './registerServiceWorker'
import {
  ConnectedRouter, routerReducer, routerMiddleware, push,
} from 'react-router-redux'

import reducers from './modules/reducers'

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
// Also apply our middleware for navigating
const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer,
  }),
  composeEnhancers(
    applyMiddleware(middleware),
  ),
)

console.log(store)
const main = [
  {
    path: '/',
    exact: false,
    component: HomePage,
  }, {
    path: '*',
    exact: true,
    component: NotFound,
  }, {
    path: '*',
    exact: true,
    component: NotFound,
  },
  
  /* And so on. */]

const routeComponents = main.map(({path, exact, component}, key) =>
  <Route exact={!!exact}
         path={path}
         component={component}
         key={key}
         {...this.props}
  />)

ReactDOM.render(
  <Provider store={store}>
    {/* ConnectedRouter will use the store from Provider automatically */}
    <ConnectedRouter history={history}>
      <Router>
        <MuiThemeProvider theme={CustomTheme}>
          <Switch>
            {routeComponents}
          </Switch>
        </MuiThemeProvider>
      </Router>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
)
registerServiceWorker();