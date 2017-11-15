import React, { Component } from 'react'
import { withRouter, Route, Switch } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import { push } from 'react-router-redux'

import PropTypes from 'prop-types'
import CategoryPostsPage from '../pages/CategoryPostsPage'
import PostDetailPage from '../pages/PostDetailPage'
import AllPostsPage from '../pages/AllPostsPage'
import TabContainer from '../menu/TabContainer'
import CopyrightBar from '../footer/CopyrightBar'
import HeaderBar from '../header/HeaderBar'
import Grid from 'material-ui/Grid'
import { connect } from 'react-redux'
import { getCategories, getTabs, setupMenu } from '../../modules/actions/menu'
import { resetPosts, getPosts, createNewPost } from '../../modules/actions/posts'

const styles = theme => ({
  root: {
    flexGrow: 1, paddingTop: theme.spacing.unit * 3,
    backgroundColor: theme.palette.background.A300, boxShadow: 'none',
    minHeight: '1000px', paddingBottom: theme.spacing.unit * 3, margin: 0,
  },
})

class MainRouterSettingLayoutPage extends React.Component {
  componentWillMount () {
    this.props.fetchCategories()
    this.props.fetchTabs().then(
      this.props.changeCurrentMenu('all', 'new')
    )  
  }
  
  componentWillReceiveProps (nextProps) {
    const {location, changeCurrentMenu, fetchPosts} = this.props
    const locationChanged = nextProps.location !== location    
    if (locationChanged) {
      const {category, tab} = nextProps.location.state
      return changeCurrentMenu(category, tab).then(
        fetchPosts(category, tab)
      )
    }
  }

  render() {
    const {classes} = this.props
    return (
      <div>
        <HeaderBar/>
        <div className={classes.root}>
          <Grid container spacing={0}>
            <Grid item md={3}/>
            <Grid item md={6} container={true} direction="column">
              
              <Route exact path='/'component={AllPostsPage}/>
              <Route exact path='/category/:category/'
                     component={CategoryPostsPage}
                     requestNewPost={this.requestNewPost}
                     
                     
                     />
              <Route path='/posts/:id'
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
}  

const mapStateToProps = (state) => {
  return {
    postList: state.posts.postList,
    currentCategory: state.currentMenu.category,
    currentTab: state.currentMenu.tab,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCategories: () => new Promise((res) => dispatch(getCategories())),
    fetchTabs: () => new Promise((res) => dispatch(getTabs())),
    changeCurrentMenu: (category, tab) => new Promise(
      (res) => dispatch(setupMenu(category, tab))),
    fetchPosts: (category, tab) => new Promise(
      (res) => dispatch(getPosts(category, tab))),
    createNewPost: (content, category, tab) => 
      dispatch(createNewPost(content, category, tab)),
    goBack: (category) => dispatch(push(`/category/${category}`))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(MainRouterSettingLayoutPage, CategoryPostsPage))