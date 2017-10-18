import PropTypes from 'prop-types'
import MainLayout from '../mainLayout/MainLayout'
import CopyrightBar from '../footer/CopyrightBar'
import HeaderBar from '../header/HeaderBar'
import React, { Component } from 'react'

class HomePage extends Component {
  render () {
    return (
      <div>
        <HeaderBar/>
        <MainLayout/>
        <CopyrightBar/>
      </div>
    )
  }
}

HomePage.propTypes = {}

export default HomePage