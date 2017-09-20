import React, { Component } from 'react'
import { Router, Route, browserHistory } from 'react-router';



import HeaderBar from './Header/HeaderBar'
import MainContent from './Component/MainContent'

import theme from './theme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import CopyrightBar from './Component/CopyrightBar'
import './App.css'


class App extends Component {
  render() {
    return (
      <div>
      <MuiThemeProvider theme={theme}>
  
        <div>
           <HeaderBar />
           <MainContent />
           <CopyrightBar />
         </div>

      </MuiThemeProvider>

      </div>

    )
  }
}

export default App
