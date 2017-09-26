import React from 'react'
import PropTypes from 'prop-types'
import MainContent from '../components/MainContent'
import CopyrightBar from '../components/CopyrightBar'
import HeaderBar from '../Header/HeaderBar'
import { selectCategory } from '../modules/actions'

class HomePage extends React.Component {
  state = {
    currentTab: null,
    currentCategory: null
  }
  
  
  
  render () {
    const {currentCategory, currentTab} = this.state
    return (
      <div>
        <HeaderBar/>
        <MainContent></MainContent><CopyrightBar/>
      </div>
    )
  }
  
}

HomePage.propTypes = {}

export default HomePage
