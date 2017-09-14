import React, { Component } from 'react'
import './App.css'
import HeaderBar from './HeaderBar'
import theme from './theme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
  render() {
    return (
	      <MuiThemeProvider theme={theme}>
	      <HeaderBar />
      </MuiThemeProvider>
    )
  }
}

export default App
