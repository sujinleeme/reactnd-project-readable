import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import history from './history'
import store from './store'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'

import registerServiceWorker from './registerServiceWorker'

import CustomTheme from './styles/CustomTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import MainRouterSettingLayoutPage from './components/pages/MainRouterSettingLayoutPage'

ReactDOM.render(
  <Provider store={ store }>
    <ConnectedRouter history={ history }>
      <Router>
        <MuiThemeProvider theme={ CustomTheme }>
          <Switch>
            <Route
              path='/'
              component={ MainRouterSettingLayoutPage }
            />
          </Switch>
        </MuiThemeProvider>
      </Router>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()