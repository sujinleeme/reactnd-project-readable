import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import { withRouter, Link } from 'react-router-dom'

import Tabs, { Tab } from 'material-ui/Tabs'

const styles = theme => ({
  root: {
    width: '100%',
    flexGrow: 1,
    backgroundColor: theme.palette.background.A300,
    boxShadow: 'none'
  },
})

const tabList = ['hot', 'comments', 'new']

function TabContainer(props) {
  return <div>{props.children}</div>;
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};



class MainTabs extends React.Component {
  
  state = {
    value: 0,
  };
  
  handleChange = (event, value) => {
    this.setState({ value });
    const {classes, currentCategory, location} = this.props
  
  };
  
  render () {
    const {classes, currentCategory, location} = this.props
    const { value } = this.state;
    console.log(currentCategory)
    const baseURL = `#/category/${currentCategory}/`
    return (
  
      <Tabs className={classes.root} value={value} onChange={this.handleChange}>
        {tabList.map((name) => (
          <Tab
            key={name}
            label={name}
            value={0}
            component={Link}
            to={{
              pathname: '/category',
              search: `${currentCategory}?${name}`,
              state: { tab: name }
            }}
          />
        ))}
      </Tabs>

    )
  }
}

MainTabs.propTypes = {}

export default withRouter(withStyles(styles)(MainTabs))