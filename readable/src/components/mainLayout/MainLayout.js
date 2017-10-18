import React from 'react'
import PropTypes from 'prop-types'
import Grid from 'material-ui/Grid'
import PostContainer from '../container/PostContainer'
import PaperSheet from '../assests/PaperSheet'
import TabContainer from '../container/TabContainer'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  root: {
    flexGrow: 1,
    paddingTop: theme.spacing.unit * 3,
    backgroundColor: theme.palette.background.A300,
    boxShadow: 'none',
    minHeight: '1000px',
    paddingBottom: theme.spacing.unit
  },
  
})

class MainLayout extends React.Component {
  
  render () {
    const {classes} = this.props
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item md={2}/>
          <Grid item md={6} container={true} direction="column">
            <TabContainer/>
            <PostContainer/>
          </Grid>
        <Grid item md={2}><q>             </q>
            <PaperSheet/>
          </Grid>
          <Grid item md={2}/>
        </Grid>
      </div>
    )
  }
}

MainLayout.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(MainLayout)