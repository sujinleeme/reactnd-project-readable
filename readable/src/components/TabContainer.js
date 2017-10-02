import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { selectTab } from '../modules/menu/actions'
import Tabs, { Tab } from 'material-ui/Tabs'

const styles = theme => ({
  root: {
    width: '100%',
    flexGrow: 1,
    backgroundColor: theme.palette.background.A300,
    boxShadow: 'none',
  },
})

const tabList = ['hot', 'comments', 'new']

class TabContainer extends React.Component {
  
  state = {
    value: 0,
  }
  
  handleChange = (e, value) => {
    e.stopPropagation()
    const {changeTab, selectMenu} = this.props
    const categoryName = selectMenu.category
    const tabName = (value < 0 ? tabList[0] : tabList[value])
    this.updateTab(tabName, value, categoryName)
  }
  
  updateTab (tab, tabIndex, category) {
    const {changeTab, changeRoute} = this.props
    changeTab({tab: tab})
    changeRoute(`/category/${category}?=${tab}`)
    this.setState({value: tabIndex})
  }
  
  render () {
    const {classes} = this.props
    const {value} = this.state
    const props = this.props
    const currentCategory = props.selectMenu.category
    const currentTab = props.selectMenu.tab
    
    const tabIndex = (currentTab ? tabList.indexOf(currentTab) : 0)
    
    console.log(tabIndex)
    return (
      <Tabs className={classes.root} value={tabIndex}
            onChange={this.handleChange}>
        {tabList.map((name, index) => (
          <Tab
            key={name}
            label={name}
            component={Link}
            value={index}
            to={{
              pathname: `/category/${currentCategory}?=${name}`,
              state: {category: currentCategory, tab: name},
            }}
          />
        ))}
      </Tabs>
    
    )
  }
}

TabContainer.propTypes = {}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    selectMenu: {
      category: state.currentMenu.category,
      tab: state.currentMenu.tab,
    },
    
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeTab: (data) => dispatch(selectTab(data)),
    changeRoute: (url) => dispatch(push(url)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(withStyles(styles)(TabContainer)))
