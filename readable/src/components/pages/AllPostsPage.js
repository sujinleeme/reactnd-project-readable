import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import {
  getAllPosts, resetPosts, createNewPost,
} from '../../modules/actions/posts'
import { setupMenu } from '../../modules/actions/menu'
import PostListContainer from '../post/list/PostListContainer'
import TabContainer from '../menu/TabContainer'
import NewPost from '../post/create/NewPost'
import LoadingProgress from '../assests/LoadingProgress'
import MainRouterSettingLayoutPage from './MainRouterSettingLayoutPage'

class AllPostsPage extends React.Component {
  componentDidMount () {
    this.props.fetchAllPosts(this.props.currentTab)
  }
  
  componentWillUnmount () {
    this.props.resetPosts()
  }
  
  render () {
    const {postList, submitNewPost, currentTab} = this.props
    const {loading} = postList
    const posts = postList.posts
    if (loading) {
      return (
        <div>
          <TabContainer/>
          <NewPost />
          <LoadingProgress/>
        </div>
      )
    }
    return (
      <div>
        <TabContainer/>
        <NewPost />
        <PostListContainer
          posts={posts}
          tab={currentTab}
        />
      </div>
    )
  }
}

AllPostsPage.propTypes = {
  classes: PropTypes.object.isRequired,
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
    fetchAllPosts: (tab) => new Promise((res) => dispatch(getAllPosts(tab))),
    resetPosts: () => dispatch(resetPosts()),
   
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles()(AllPostsPage))