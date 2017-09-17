import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Category from './Category'
import Grid from 'material-ui/Grid'

const styles = theme => ({
  root: {
    minHeight: '150px'
  },
})

const HeaderBar = (props) => {
  const classes = props.classes
	return (
	  <div className={classes.root}>
      <Grid container spacing={24}>
        <AppBar position="static" color="inherit">
				  <Toolbar classes={{
            root: props.classes.root
          }}>
            <Grid item md={2}>
            </Grid>
            <Grid item md={6} container={true} direction="column">
              <div className="brandLogo">
                <Typography type="title" color="inherit" className="main">#MakewithUdacity</Typography>
                <Typography type="title" color="accent">/ Udacity Nanodegree Student's Projects
                </Typography>
              </div>
              <Category/>
            </Grid>
            <Grid item md={4}/>
          </Toolbar>
        </AppBar>
      </Grid>
		</div>
  )
}

HeaderBar.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(HeaderBar)
