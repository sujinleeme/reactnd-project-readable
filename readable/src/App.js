import React, { Component } from 'react'

import {
  BrowserRouter as Router,
  Route,
  
  Switch
} from 'react-router-dom';

import NotFound from './Component/NotFound'

import theme from './theme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import HomePage from './Pages/HomePage'
import './App.css'

const routes = [{
  path: '/',
  exact: false,
  component: HomePage,
  
}, {
  path: '*',
  exact: false,
  component: NotFound,
}, {
  path: '/search',
  exact: true,
  component: HomePage
}/* And so on. */];


class App extends Component {
  render() {
    const routeComponents = routes.map(({path, exact, component}, key) =>
      <Route exact={!!exact}
             path={path}
             component={component}
             key={key} />);
  
    return (
      <Router>
          <MuiThemeProvider theme={theme}>
            <Switch>
              {routeComponents}
              
            </Switch>
          </MuiThemeProvider>
      </Router>

    )
  }
}

export default App
