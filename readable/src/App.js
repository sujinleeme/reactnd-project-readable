import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  selectCategory, selectTab, categoryFetchData, tabFetchData, setupMenu,
} from './modules/menu/actions/menu'
import { itemsFetchData } from './modules/menu/actions/posts'
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
  
  componentWillReceiveProps (nextProps) {
    const locationChanged = nextProps.location !== this.props.location
    if (locationChanged) {
      this.setMenu(locationChanged, nextProps)
    }
  }
  
  async componentDidMount () {
    const haslocationState = this.props.location.state
    const props = this.props
    await Promise.all([
      this.props.fetchCategoryList(),
      this.props.fetchTabList(),
      this.props.fetchData(),
    ]).then(
      await this.setMenu(haslocationState, props)
    )
  }
  
  setMenu (bool, props) {
    let categoryName, tabName
    if (bool) {
      categoryName = props.location.state.category
      tabName = props.location.state.tab
    }
    else {
      console.log(this.props.categories)
      categoryName = 'react'
      tabName = 'hot'
    }
    return new Promise((res) => {
      res(this.props.setCurrentMenu(categoryName, tabName))
    })
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
    items: state.items,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeCategory: (data) => dispatch(selectCategory(data)),
    changeTab: (data) => dispatch(selectTab(data)),
    changeRoute: (url) => dispatch(push(url)),
    fetchCategoryList: () => dispatch(categoryFetchData()),
    fetchTabList: () => dispatch(tabFetchData()),
    fetchData: (url) => dispatch(itemsFetchData(url)),
    setCurrentMenu: (category, tab) => dispatch(setupMenu(category, tab)),
    
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(App))
