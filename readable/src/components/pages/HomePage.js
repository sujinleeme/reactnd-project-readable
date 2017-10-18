import PropTypes from 'prop-types'
import MainContent from '../MainContent'
import CopyrightBar from '../CopyrightBar'
import HeaderBar from '../header/HeaderBar'
import React, { Component } from 'react'

class HomePage extends Component {
  
  render () {
    
    const props = this.props
    return (
      <div>
        <HeaderBar/>
        <MainContent/>
        <CopyrightBar/>
      </div>
    )
  }
}

HomePage.propTypes = {}

export default HomePage