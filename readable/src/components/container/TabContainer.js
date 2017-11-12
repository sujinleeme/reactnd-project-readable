import React from 'react'
import { withStyles } from 'material-ui/styles'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Tabs, { Tab } from 'material-ui/Tabs'

const styles = theme => ({
  root: {
    flexGrow: 1, backgroundColor: theme.palette.background.A300,
    boxShadow: 'none', paddingLeft: theme.spacing.unit * 3,
  },
})

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

TabContainer.propTypes = {}

const mapStateToProps = (globalState) => {
  return {
    currentCategory: globalState.currentMenu.category,
    currentTab: globalState.currentMenu.tab, categories: globalState.categories,
    tabs: globalState.tabs,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(withStyles(styles)(TabContainer)))
