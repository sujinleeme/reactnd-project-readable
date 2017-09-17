import React, { Component } from 'react'
import './App.css'
import HeaderBar from './Component/HeaderBar'
import MainContent from './Component/MainContent'

import theme from './theme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import CopyrightBar from './Component/CopyrightBar'


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
