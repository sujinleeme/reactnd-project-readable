import React from 'react'
import PropTypes from 'prop-types'
import MainContent from '../Component/MainContent'
import CopyrightBar from '../Component/CopyrightBar'
import HeaderBar from '../Header/HeaderBar'


class HomePage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentCategory: 'react',
      currentTab: 'hot',
    }
    
    this.selectCategory = this.selectCategory.bind(this)
    this.selectTab = this.selectTab.bind(this)
  }
  
  selectCategory(name) {
    this.setState({currentCategory: name})
  }
  
  selectTab(name) {
    this.setState({currentTab: name})
  }
  
  
  render () {
    const {currentCategory, currentTab} = this.state
    return (
      <div>
        <HeaderBar
          currentCategory={currentCategory}
          currentTab={currentTab}
          selectCategory={this.selectCategory}
          />
        <MainContent
          currentCategory={currentCategory}
          currentTab={currentTab}
          selectCategory={this.selectCategory}
          selectTab={this.selectTab}
          />
        <CopyrightBar/>
      </div>
    )
  }
}

HomePage.propTypes = {}

export default HomePage
