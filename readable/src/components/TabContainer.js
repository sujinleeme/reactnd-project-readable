import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { selectTab } from '../modules/actions'
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
    tabName: tabList[0],
  }
  
  handleChange = (e, value) => {
    e.stopPropagation()
    this.setState({value})
    
    
  }
  
  render () {
    const {classes } = this.props
    const {value} = this.state
    const props = this.props
    const currentCategory = props.selectMenu.category
    const currentTab = props.selectMenu.tab
    return (
      <Tabs className={classes.root} value={value} onChange={this.handleChange}>
        {tabList.map((name) => (
          <Tab
            key={name}
            label={name}
            value={0}
            component={Link}
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
