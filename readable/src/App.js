import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { selectCategory, selectTab } from './modules/actions'

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
  }, {
    path: '*',
    exact: true,
    component: NotFound,
  },
]

const routeComponents = main.map(({path, exact, component}, key) =>
  <Route exact={!!exact}
         path={path}
         component={component}
         key={key}
         {...this.props}
  />)


class App extends Component {
  render() {
    console.log('Props', this.props)
    return (
      <div>
        {routeComponents}
      </div>
    )
  }
}


const mapStateToProps = ({ menu }) => {
  
  const categoryList = categories.defaultData.categories
  const tabList = ['hot', 'commnet', 'udacity']
  
  return {
    menu : {
      categories: categoryList,
      tabs: tabList
    },
    currentMenu: {
      category: categoryList[0].path,
      tab: tabList[0]
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeCategory: (data) => dispatch(selectCategory(data)),
    changeTab: (data) => dispatch(selectTab(data))
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
