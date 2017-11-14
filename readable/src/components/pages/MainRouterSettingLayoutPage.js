import React from 'react'
import { withRouter, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import CategoryPostsPage from '../pages/CategoryPostsPage'
import PostDetailPage from '../pages/PostDetailPage'
import AllPostsPage from '../pages/AllPostsPage'
import TabContainer from '../menu/TabContainer'
import CopyrightBar from '../footer/CopyrightBar'
import HeaderBar from '../header/HeaderBar'
import Grid from 'material-ui/Grid'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  root: {
    flexGrow: 1, paddingTop: theme.spacing.unit * 3,
    backgroundColor: theme.palette.background.A300, boxShadow: 'none',
    minHeight: '1000px', paddingBottom: theme.spacing.unit * 3, margin: 0,
  },
})

const MainRouterSettingLayoutPage = (props) => {
  const {classes} = props
  return (
    <div>
      <HeaderBar/>
      <div className={classes.root}>
        <Grid container spacing={0}>
          <Grid item md={3}/>
          <Grid item md={6} container={true} direction="column">
            <TabContainer/>
            <Route exact path='/' component={AllPostsPage}/>
            <Route exact path='/category/:category/:tab'
                   component={CategoryPostsPage}/>
            <Route path='/category/:category=:tab/posts/:id'
                   component={PostDetailPage}/>
          </Grid>
          <Grid item md={3}>
          </Grid>
        </Grid>
      </div>
      <CopyrightBar/>
    </div>
  )
}

MainRouterSettingLayoutPage.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(MainRouterSettingLayoutPage))
