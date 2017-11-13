import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCategories, getTabs, setupMenu,  } from './modules/actions/menu'
import { getPosts, getAllPosts } from './modules/actions/posts'
import { withRouter } from 'react-router-dom'
import HomePage from './components/pages/HomePage'

class App extends Component {
  componentWillReceiveProps (nextProps) {
    const locationChanged = nextProps.location !== this.props.location
    if (locationChanged) {
      return this.readPostClickbyMenu(locationChanged, nextProps)
    }
  }
  
  componentDidMount () {
    const {location, fetchCategories, fetchTabs} = this.props
    const hasLocationState = location.state
    fetchCategories()
    fetchTabs()
    return this.readPostClickbyMenu(hasLocationState, this.props)
  }
  
  readPostClickbyMenu (bool, props) {
    let categoryName, tabName
    if (bool && props.location.state) {
      categoryName = props.location.state.category
      tabName = props.location.state.tab
    } else {
      if (props.location.pathname === '/') {
        //init
        categoryName = 'all'
        tabName = 'new'
      } else {
        const baseQuery = this.props.location.pathname.split('/')[2]
        const query = baseQuery.split('=')
        categoryName = query[0]
        tabName = query[1]
      }
    }
    return this.props.changeCurrentMenu(categoryName, tabName)
    .then(this.props.fetchPosts(categoryName, tabName))
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

const mapStateToProps = (state) => {
  return {
    path: state.routerReducer.location.pathname
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  
  
    fetchAllPosts: (tab) => new Promise(
      (res) => dispatch(getAllPosts(tab))),
  
    fetchCategories: () => new Promise((res) => dispatch(getCategories())),
    fetchTabs: () => new Promise((res) => dispatch(getTabs())),
    fetchPosts: (category, tab) => new Promise(
      (res) => dispatch(getPosts(category, tab))),
    changeCurrentMenu: (category, tab) => new Promise(
      (res) => dispatch(setupMenu(category, tab))),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
