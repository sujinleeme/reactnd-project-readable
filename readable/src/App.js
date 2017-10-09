import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  selectCategory, selectTab, categoryFetchData, tabFetchData, initMenuData,
} from './modules/menu/actions'

import {
  urls,
} from './utils/urls'

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
  
  state = {
    value: 0,
  }
  
  componentWillMount () {
    this.browserRefreshing()
  }
  
  componentWillReceiveProps (nextProps) {
    this.browserPageMove(nextProps)
    
  }
  
  componentDidMount () {
    this.init()
  }
  
  init () {
    this.props.fetchCategoryList()
    this.props.fetchTabList()
  }
  
  parseURL () {
    let categoryName
    let tabName
    const {location, categories, changeCategory} = this.props
    console.log(this.props.location)
    // refreshing
    if (location.state) {
      categoryName = location.state.category
    }
    else {
      categoryName = location.pathname.split('/')[2]
    }
    return categoryName
    
  }
  
  browserRefreshing () {
    this.props.changeRoute()
    const url = this.parseURL()
    console.log(url)
    
  }
  
  updateCurrentMenu (categoryName, tabName) {
    const {changeCategory, changeRoute} = this.props
    changeCategory({category: categoryName})
    changeRoute(`/category/${categoryName}?=${tabName}`)
  }
  
  browserPageMove (nextProps) {
    const {changeCategory, location, categories, selectMenu, changeRoute} = this.props
    console.log(location)
    const tabName = selectMenu.tab
    const locationChanged = nextProps.location !== location
    
    if (locationChanged) {
      const categoryName = nextProps.location.state.category
      return this.updateCurrentMenu(categoryName, tabName)
    }
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
  
  return {
    selectMenu: {
      category: state.currentMenu.category,
      tab: state.currentMenu.tab,
    },
    categories: state.categories,
    tabs: state.tabs,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeCategory: (data) => dispatch(selectCategory(data)),
    changeTab: (data) => dispatch(selectTab(data)),
    changeRoute: (url) => dispatch(push(url)),
    fetchCategoryList: () => dispatch(categoryFetchData()),
    fetchTabList: () => dispatch(tabFetchData()),
    initMenu: () => dispatch(initMenuData()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
