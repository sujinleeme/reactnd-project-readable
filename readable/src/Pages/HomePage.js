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
    const props = this.props
    const state = this.state
    return (
      <div>
        <HeaderBar
          currentCategory={state.currentCategory}
          selectCategory={this.selectCategory}
          
          {...props}/>
        <MainContent
          currentCategory={state.currentCategory}
          currentTab={state.currentCategory}
          selectCategory={this.selectCategory}
          selectTab={this.selectTab}
          {...props}/>
        <CopyrightBar/>
      </div>
    )
  }
}

HomePage.propTypes = {}

export default HomePage
