import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCategories, getTabs, setupMenu } from './modules/actions/menu'
import { getPosts } from './modules/actions/posts'
import { withRouter } from 'react-router-dom'
import MainRouterSettingLayoutPage from './components/pages/MainRouterSettingLayoutPage'

class App extends Component {
  componentWillMount () {
    this.props.fetchCategories()
    this.props.fetchTabs()
  }
  
  componentWillReceiveProps (nextProps) {
    const {location, changeCurrentMenu, fetchPosts} = this.props
    const locationChanged = nextProps.location !== location
    if (locationChanged) {
      const {category, tab} = nextProps.location.state
      return changeCurrentMenu(category, tab)
      .then(fetchPosts(category, tab))
    }
  }
  
  render () {
    return (
      <Switch>
        <Route
          path='/'
          component={MainRouterSettingLayoutPage}
        />
      </Switch>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentCategory: state.currentMenu.category,
    currentTab: state.currentMenu.tab,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCategories: () => new Promise((res) => dispatch(getCategories())),
    fetchTabs: () => new Promise((res) => dispatch(getTabs())),
    fetchPosts: (category, tab) => new Promise(
      (res) => dispatch(getPosts(category, tab))),
    changeCurrentMenu: (category, tab) => new Promise(
      (res) => dispatch(setupMenu(category, tab))),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
