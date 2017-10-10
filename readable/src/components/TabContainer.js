import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { selectTab, tabFetchData } from '../modules/menu/actions/menu'

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
  }
  
  handleChange = (e, value) => {
    e.stopPropagation()
    const {selectMenu, tabs} = this.props
    const categoryName = selectMenu.category
    const tabName = (value < 0 ? tabs[0].name : tabs[value].name)
    this.updateTab(tabName, value, categoryName)
  }
  
  updateTab (tab, tabIndex) {
    this.setState({value: tabIndex})
    const {changeTab, changeRoute, selectMenu} = this.props
    changeTab({tab: tab})
    changeRoute(`/category/${selectMenu.category}?=${tab}`)
  }
  
  getTabIndexNum (tabName) {
    if (this.props.location.state ) {
      tabName = this.props.location.state.tab
    }
    let num = this.props.tabs.findIndex(x => x.name === tabName)
    let checkNum = (num < 0 ? num = 0 : num)
    return checkNum
  }
  
  render () {
    const {classes} = this.props
    const props = this.props
    const currentCategory = props.selectMenu.category
    const tabItems = props.tabs
    const currentTab = props.selectMenu.tab
    const tabIndex = this.getTabIndexNum(currentTab)
    
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
