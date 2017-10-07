import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  selectCategory, selectTab, categoryFetchData, tabFetchData, setOperation
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

  
    //this.browserPageMove(nextProps)
  }
  
  componentDidMount() {
    // this.browserRefreshing()
  }
  
  init () {
    this.props.fetchCategoryList()
    this.props.fetchTabList()
  }
  
  
  browserPageMove (nextProps) {
    const {changeCategory, location, selectMenu, changeRoute} = this.props
    const tabName = selectMenu.tab
    
    //
    const locationChanged = nextProps.location !== location
    console.log(nextProps.location, location)
  
    if (locationChanged) {

      console.log(nextProps.location.state)
      //
      // if (nextProps.location.state) {
      //   console.log(nextProps.location.state)
      //
      //   const categoryName = nextProps.location.state.category
      //   changeCategory({category: categoryName})
      //   // changeRoute(`/category/${categoryName}?=${tabName}`)
      //
      //
      // }

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
