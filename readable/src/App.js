import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { selectCategory, selectTab } from './modules/actions'

import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'

import NotFound from './pages/NotFound'
import HomePage from './pages/HomePage'

import * as categories from './api-server/categories'

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
  
  init () {
    const {changeCategory, changeTab, selectMenu, location} = this.props
    console.log(location)
    if(location) {
      // const path = location.pathname
      const categoryName = location.state.category
      changeCategory({category: categoryName})
      changeTab({tab: selectMenu.tab})
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
  
  componentWillReceiveProps (nextProps) {
    this.browserPageMove(nextProps)
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
  const tabList = ['hot', 'commnet', 'udacity']
  
  return {
    selectMenu: {
      category: categoryList[0].path,
      tab: tabList[0],
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
