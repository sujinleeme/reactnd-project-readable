import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { selectCategory, selectTab } from './modules/menu/actions'

import { push } from 'react-router-redux'

import NotFound from './components/pages/NotFound'
import HomePage from './components/pages/HomePage'

import * as categories from './api-server/categories'
import * as tabs from './api-server/tabs'

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
  componentDidMount () {
    this.init()
  }
  
  componentWillReceiveProps (nextProps) {
    this.browserPageMove(nextProps)
  }
  
  init () {
    const {changeCategory, changeTab, selectMenu, location} = this.props
    if (location.state) {
      const categoryName = location.state.category
      const tabName = location.state.tab
      changeCategory({category: categoryName})
      changeTab({tab: tabName})
    }
    else {
      changeCategory({category: selectMenu.category})
    }
  }
  
  browserPageMove (nextProps) {
    const {changeCategory} = this.props
    const locationChanged = nextProps.location !== this.props.location
    if (locationChanged) {
      if (nextProps.location.state) {
        const categoryName = nextProps.location.state.category
        return changeCategory({category: categoryName})
      }
    }
  }
  
  render () {
    const {changeTab, selectMenu, store} = this.props
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
  const categoryList = categories.defaultData.categories
  const tabList = tabs.defaultData.tabs
  
  return {
    selectMenu: {
      category: categoryList[0].path,
      tab: tabList[0].path,
    },
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeCategory: (data) => dispatch(selectCategory(data)),
    changeTab: (data) => dispatch(selectTab(data)),
    changeRoute: (url) => dispatch(push(url)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
