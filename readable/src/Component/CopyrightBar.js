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

const CopyrightBar = (props) => {
  const classes = props.classes
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography type="title" color="inherit">
            SUJIN LEE
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

CopyrightBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CopyrightBar)