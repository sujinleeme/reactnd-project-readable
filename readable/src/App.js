import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import CustomTheme from './Theme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import './App.css'
import NotFound from './Component/NotFound'
import HomePage from './Pages/HomePage'




const main = [{
  path: '/',
  exact: false,
  component: HomePage,
  
}, {
  path: '*',
  exact: false,
  component: NotFound,
}
  /* And so on. */];


class App extends Component {
  render() {
    const routeComponents = main.map(({path, exact, component}, key) =>
      <Route exact={!!exact}
             path={path}
             component={component}
             key={key} />);
  
    return (
      <Router >
          <MuiThemeProvider theme={CustomTheme}>
            <Switch>
              {routeComponents}
            </Switch>
          </MuiThemeProvider>
      </Router>

    )
  }
}

export default App
