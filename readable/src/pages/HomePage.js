import React from 'react'
import PropTypes from 'prop-types'
import MainContent from '../components/MainContent'
import CopyrightBar from '../components/CopyrightBar'
import HeaderBar from '../Header/HeaderBar'

const HomePage = () => {
    return (
      <div>
        <HeaderBar/>
        <MainContent/>
        <CopyrightBar/>
      </div>
    )
}

HomePage.propTypes = {}

export default HomePage
