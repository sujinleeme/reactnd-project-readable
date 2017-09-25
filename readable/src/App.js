import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import CustomTheme from './Theme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import './App.css'
import NotFound from './Pages/NotFound'
import HomePage from './Pages/HomePage'




const main = [{
  path: '/',
  exact: false,
  component: HomePage,
}, {
  path: '*',
  exact: true,
  component: NotFound,
},{
  path: '/category(?)',
  exact: true,
  component: NotFound,
}

  /* And so on. */];


class App extends Component {
  render() {
    const routeComponents = main.map(({path, exact, component}, key) =>
      <Route exact={!!exact}
             path={path}
             component={component}
             key={key}
             {...this.props}
      />);
  
    return (
      <Router location={this.props.location}>
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
