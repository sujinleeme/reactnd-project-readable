import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  getCategories, getTabs, setupMenu,
} from './modules/actions/menu'
import { postsFetchData } from './modules/actions/posts'
import { withRouter } from 'react-router-dom'

import NotFound from './components/pages/NotFound'
import HomePage from './components/pages/HomePage'

const main = [
  {
    path: '/',
    exact: false,
    component: HomePage,
  }, {
    path: '*',
    exact: true,
    component: NotFound,
  },
]

const routeComponents = main.map(
  ({path, exact, component, store, history}, key) =>
    <Route exact={!!exact}
           path={path}
           component={component}
           key={key}
           history={history}
    />)

class App extends Component {
  componentWillReceiveProps (nextProps) {
    const locationChanged = nextProps.location !== this.props.location
    if (locationChanged) {
      return this.changeMenu(locationChanged, nextProps)
    }
  }
  
  async componentDidMount () {
    const haslocationState = this.props.location.state
    const props = this.props
    console.log(haslocationState)
    
    await Promise.all([
      this.props.fetchCategories(),
      this.props.fetchTabs()]).then(
      this.changeMenu(haslocationState, props),
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
      this.props.fetchPosts(categoryName),
    )
  }
  
  render () {
    const props = this.props
    return (
      <div>
        <Route exact={false}
               path={'/'}
               component={HomePage}
               {...this.props}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  if (!state.currentMenu.tabs || state.currentMenu.category) {
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
    fetchPosts: (category) => new Promise(
      (res) => dispatch(postsFetchData(category))),
    changeCurrentMenu: (category, tab) => new Promise(
      (res) => dispatch(setupMenu(category, tab))),
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(App))
