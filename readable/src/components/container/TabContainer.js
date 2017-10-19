import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'

import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Tabs, { Tab } from 'material-ui/Tabs'
import { setupMenu } from '../../modules/actions/menu'

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.A300,
    boxShadow: 'none',
    paddingLeft: theme.spacing.unit * 3,
    
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
    return this.props.changeCurrentMenu(tabName, categoryName)
  }
  
  getTabIndexNum (tabName) {
    if (this.props.location.state) {
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
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
      
      
      >
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
    changeCurrentMenu: (category, tab) => new Promise(
      (res) => dispatch(setupMenu(category, tab))),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(withStyles(styles)(TabContainer)))
