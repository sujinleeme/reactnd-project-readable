import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'
import Copyright from 'material-ui-icons/Copyright'
import { styles } from '../../styles/CopyrightBar'


const CopyrightBar = (props) => {
  const classes = props.classes
  return (
    <div>
      <AppBar position="static" color="default">
        <Toolbar>
          <Grid container spacing={24}>
            <Grid item md={2}/>
            <Grid item md={8} className={classes.root}>
              <Copyright className={classes.copyright}/>
              <Typography type="subheading" color="inherit">
                Sujin Lee
              </Typography>
            </Grid>
            <Grid item md={2}/>
          </Grid>
        </Toolbar>
      
      </AppBar>
    
    </div>
  )
}

CopyrightBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CopyrightBar)