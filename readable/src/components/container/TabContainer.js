import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Tabs, { Tab } from 'material-ui/Tabs'
import { styles } from '../../styles/container/TabContainer'

class TabContainer extends React.Component {
  state = {
    value: 0,
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
    const {classes, currentCategory, currentTab, tabs} = this.props
    const tabIndex = this.getTabIndexNum(currentTab)
    return (
      tabs && <Tabs className={classes.root} value={tabIndex}
                    indicatorColor="primary"
                    textColor="primary"
      >
        {tabs.map((({name, path}, index) => (
          <Tab
            key={name}
            label={name}
            component={Link}
            value={index}
            to={{
              pathname: `/category/${currentCategory}=${path}`,
              state: {category: currentCategory, tab: name},
            }}
          />
        )))}
      </Tabs>
    )
  }
}

TabContainer.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = (globalState) => {
  return {
    currentCategory: globalState.currentMenu.category,
    currentTab: globalState.currentMenu.tab, categories: globalState.categories,
    tabs: globalState.tabs,
  }
}

export default connect(mapStateToProps)(
  withRouter(withStyles(styles)(TabContainer)))
