import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import CategoryBox from '../components/CategoryBox'
import Grid from 'material-ui/Grid'
import { Link } from 'react-router-dom'

const styles = theme => ({
  root: {
    minHeight: '150px',
  },
})

class HeaderBar extends React.Component {
  constructor (props) {
    super(props)
  }
  
  render () {
    const classes = this.props.classes
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <AppBar position="static" color="inherit">
            <Toolbar classes={{
              root: classes.root,
            }}>
              <Grid item md={2}>
              </Grid>
              <Grid item md={6} container={true} direction="column">
                <div className="brandLogo">
                  <Typography type="title" color="inherit"
                              className="main">
                    <Link to={`/`}>#MakewithUdacity</Link>
                  </Typography>
                  <Typography type="title" color="accent">
                    / Udacity Nanodegree Student's Projects
                  </Typography>
                </div>
                <CategoryBox
                  selectCategory={this.props.selectCategory}
                  currentTab={this.props.currentTab}
                  currentCategory={this.props.currentCategory}
                />
              </Grid>
              <Grid item md={4}/>
            </Toolbar>
          </AppBar>
        </Grid>
      </div>
    )
  }
}

HeaderBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(HeaderBar)
