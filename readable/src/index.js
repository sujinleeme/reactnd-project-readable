import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import './index.css'
import history from './history'
import store from './store'

import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter} from 'react-router-redux'

import registerServiceWorker from './registerServiceWorker'

import CustomTheme from './CustomTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

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