import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  selectCategory, selectTab, categoryFetchData, tabFetchData,
} from './modules/menu/actions'

import { push } from 'react-router-redux'

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
  componentWillMount() {
    this.init()
  }

  componentWillReceiveProps (nextProps) {
    this.browserPageMove(nextProps)
  }
  
  componentDidMount() {
    this.browserRefreshing()
  }
  
  init () {
    this.props.fetchCategoryList()
    this.props.fetchTabList()
    
  }
  
  browserRefreshing() {
    const {changeCategory, changeTab, selectMenu, location} = this.props
    if (location.state) {
      const categoryName = location.state.category
      const tabName = location.state.tab
      changeCategory({category: categoryName})
      // changeTab({tab: tabName})
    }
    else {
      changeCategory({category: selectMenu.category})
    }
  }
  
  browserPageMove (nextProps) {
    const {changeCategory, location} = this.props
    const locationChanged = nextProps.location !== this.props.location
    if (locationChanged) {
      if (nextProps.location.state) {
        const categoryName = nextProps.location.state.category
        return changeCategory({category: categoryName})
      }
    }
  }
  
  render () {
    
    return (
      <div>
        <Route exact={false}
               path={'/'}
               component={HomePage}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    selectMenu: {
      category: state.currentMenu.category,
      tab: state.currentMenu.tab,
    },
    categories: state.categories,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeCategory: (data) => dispatch(selectCategory(data)),
    changeTab: (data) => dispatch(selectTab(data)),
    changeRoute: (url) => dispatch(push(url)),
    fetchCategoryList: () => dispatch(categoryFetchData()),
    fetchTabList: () => dispatch(tabFetchData()),
    
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
