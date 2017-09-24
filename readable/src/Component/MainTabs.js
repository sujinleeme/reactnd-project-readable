import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'

const styles = theme => ({
  root: {
    width: '100%',
  },
});

const Tabs = (props) => {
  return (
    <Tabs
      value={this.props.history.location.pathname}
      onChange={this.props.handleCallToRouter}
    >
      <Tab
        label="Home"
        value="/"
        component={Link}
        path={`${Urls.filter.path}`}
        params={{ type: 'new' }}
      >
        <div>
        </div>
      </Tab>
      <Tab
        label="Portfolio"
        value="/portfolio"
      >
        <div>
        </div>
      </Tab>
    </Tabs>
  );
}

CopyrightBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CopyrightBar)