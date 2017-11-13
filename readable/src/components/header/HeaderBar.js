import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import CategoryContainer from '../container/CategoryContainer'
import Grid from 'material-ui/Grid'
import { Link } from 'react-router-dom'

const styles = theme => ({
  root: {
    minHeight: '150px',
  },
  header: {
    display: 'block',
    padding: theme.spacing.unit * 2,
  },
  typoLogo: {
    display: 'flex',
    marginBottom: theme.spacing.unit * 2,
  },
  detailTypoLogo: {
    marginLeft: theme.spacing.unit * 2,
  },
})

const HeaderBar = (props) => {
  const classes = props.classes
  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <AppBar position="static" color="inherit">
          <Toolbar classes={{
            root: classes.root,
          }}>
            <Grid item md={3}/>
            <Grid item md={7} container={true} direction="column">
              <div className={classes.header}>
                <div className={classes.typoLogo}>
                  <Typography type="headline" color="inherit"
                              className="main">
                    <Link to={`/`}>#TalkAboutReact</Link>
                  </Typography>
                  
                  <Typography type="headline" color="accent"
                              className={classes.detailTypoLogo}>
                    / Discussion Board
                  </Typography>
                </div>
                <CategoryContainer/>
              </div>
            </Grid>
            <Grid item md={3}/>
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
