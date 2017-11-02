import React, { Component } from 'react'
import { Route, Switch, Router } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCategories, getTabs, setupMenu, } from './modules/actions/menu'
import { getPostLists } from './modules/actions/posts'
import { withRouter } from 'react-router-dom'

import HomePage from './components/pages/HomePage'

class App extends Component {
  componentWillReceiveProps (nextProps) {
    const locationChanged = nextProps.location !== this.props.location
    if (locationChanged) {
      return this.changeMenu(locationChanged, nextProps)
    }
  }
  
  async componentDidMount () {
    const hasLocationState = this.props.location.state
    const props = this.props
    
    await Promise.all([
      this.props.fetchCategories(),
      this.props.fetchTabs()]).then(
      this.changeMenu(hasLocationState, props),
    )
  }
  
  changeMenu (bool, props) {
    let categoryName, tabName
    if (bool && props.location.state) {
      categoryName = props.location.state.category
      tabName = props.location.state.tab
    }
    else {
      categoryName = this.props.selectMenu.category
      tabName = this.props.selectMenu.tab
    }
    return this.props.changeCurrentMenu(categoryName, tabName).then(
      this.props.getPostLists(categoryName),
    )
  }
  
  render () {
    return (
      <Switch>
        <Route
          path='/'
          component={HomePage}
        />

      </Switch>
    
    
    )
  }
}

const mapStateToProps = (globalState, ownProps) => {
  if (!globalState.currentMenu.tabs || globalState.currentMenu.category) {
    return {
      selectMenu: {
        category: 'react',
        tab: 'hot',
      },
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCategories: () => new Promise((res) => dispatch(getCategories())),
    fetchTabs: () => new Promise((res) => dispatch(getTabs())),
    getPostLists: (category) => new Promise(
      (res) => dispatch(getPostLists(category))),
    changeCurrentMenu: (category, tab) => new Promise(
      (res) => dispatch(setupMenu(category, tab))),
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(App))
