import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { selectTab, tabFetchData } from '../modules/menu/actions'

import Tabs, { Tab } from 'material-ui/Tabs'

const styles = theme => ({
  root: {
    width: '100%',
    flexGrow: 1,
    backgroundColor: theme.palette.background.A300,
    boxShadow: 'none',
  },
})


class TabContainer extends React.Component {
  
  state = {
    value: 0,
    tabList: []
    
  }
  
  handleChange = (e, value) => {
    e.stopPropagation()
    const {selectMenu, tabs} = this.props
    const categoryName = selectMenu.category
    const tabName = (value < 0 ? tabs[0].name : tabs[value].name)
    this.updateTab(tabName, value, categoryName)
  }
  
  
  
  
  initCurrentTab() {
    const tabItems = this.props.tabs
    let hasTab = this.props.selectMenu.tab
    if (!hasTab && tabItems.length) {
      return tabItems[0].name
      
    }
    else {
      return hasTab
    }
  }
  
  
  updateTab (tab, tabIndex, category) {
    const {changeTab, changeRoute} = this.props
    changeTab({tab: tab})
    changeRoute(`/category/${category}?=${tab}`)
    this.setState({value: tabIndex})
  }
  
  getTabIndexNum(tabList, tabName) {
    let num = tabList.findIndex(x => x.name === tabName)
    return (num < 0 ? num === 0 : num)
  }
  
  render () {
    const {classes} = this.props
    const props = this.props
    const currentCategory = props.selectMenu.category
    const tabItems = props.tabs
    const currentTab = props.selectMenu.tab
    const tabIndex = this.getTabIndexNum(tabItems, currentTab)

    
    return (
      tabItems &&
      <Tabs className={classes.root} value={tabIndex}
            onChange={this.handleChange}>
        {tabItems.map((({name, path}, index) => (
          <Tab
            key={name}
            label={name}
            component={Link}
            value={index}
            to={{
              pathname: `/category/${currentCategory}?=${path}`,
              state: {category: currentCategory, tab: name},
            }}
          />
        )))}
      </Tabs>
    
    )
  }
}

TabContainer.propTypes = {}

const mapStateToProps = (state) => {
  return {
    selectMenu: {
      category: state.currentMenu.category,
      tab: state.currentMenu.tab,
    },
    tabs: state.tabs,
    
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeTab: (data) => dispatch(selectTab(data)),
    changeRoute: (url) => dispatch(push(url)),
    fetchTabList: () => dispatch(tabFetchData()),
  
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(withStyles(styles)(TabContainer)))
