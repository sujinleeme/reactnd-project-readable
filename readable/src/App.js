import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  selectCategory, selectTab, categoryFetchData, tabFetchData, initMenuData,
} from './modules/menu/actions'

import { withRouter } from 'react-router-dom'

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
  
  componentWillMount () {
  }
  
  componentWillReceiveProps (nextProps) {
    this.browserPageMove(nextProps)
  }
  
  componentDidMount () {
    
    this.init()
    this.browserRefreshing()
    
  }
  
  init () {
    this.props.fetchCategoryList()
    this.props.fetchTabList()
  }
  
  parseURL () {
    let categoryName
    let tabName
    const {location, categories, changeCategory, changeRoute} = this.props
    
    // refreshing
    if (location.state) {
      categoryName = this.props.location.state.category
      tabName = this.props.location.state.tab
      
    }
    else {
      categoryName = location.pathname.split('/')[2]
      tabName = location.search.match(/[a-zA-Z]+/g)[0]
    }
    return [categoryName, tabName]
  }
  
  browserRefreshing () {
    const path = this.parseURL()
    return this.updateCurrentMenu(path[0], path[1])
  }
  
  updateCurrentMenu (categoryName, tabName) {
    const {changeCategory, changeTab, changeRoute} = this.props
    changeCategory({category: categoryName})
    changeTab({tab: tabName})
    changeRoute(`/category/${categoryName}?=${tabName}`)
    
  }
  
  browserPageMove (nextProps) {
    const {changeCategory, location, categories, selectMenu, changeRoute} = this.props
    const tabName = selectMenu.tab
    const locationChanged = nextProps.location !== location
    
    if (locationChanged) {
      const categoryName = nextProps.location.state.category
      const tabName = nextProps.location.state.tab
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
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(App))
