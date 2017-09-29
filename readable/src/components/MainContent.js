import React from 'react'
import PropTypes from 'prop-types'
import Tabs, { Tab } from 'material-ui/Tabs'
import Grid from 'material-ui/Grid'
import PostContainer from './PostContainer'
import PaperSheet from './PaperSheet'
import CreatePost from './CreatePost'
import TabContainer from './TabContainer'
import { withStyles } from 'material-ui/styles'



const styles = theme => ({
  root: {
    flexGrow: 1,
    paddingTop: theme.spacing.unit * 3,
    backgroundColor: theme.palette.background.A300,
    boxShadow: 'none'
  },
})

class MainContent extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    const {classes, currentCategory, currentTab} = this.props
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item md={2}/>
          <Grid item md={6} container={true} direction="column">
              <TabContainer />
            <PostContainer />
          </Grid>
          <Grid item md={2}>
            <PaperSheet/>
          </Grid>
          <Grid item md={2}/>
        </Grid>
      </div>
    )
  }
}

MainContent.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(MainContent)