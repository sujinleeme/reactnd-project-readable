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
import NewPost from '../post/create/NewPost'
import LoadingProgress from '../assests/LoadingProgress'

class AllPostsPage extends React.Component {
  componentDidMount () {
    this.props.changeCurrentMenu('all', 'new')
    return this.props.fetchAllPosts('new')
  }
  
  componentWillUnmount () {
    this.props.resetAllPosts()
  }
  
  render () {
    const {postList, submitNewPost, currentTab} = this.props
    const {loading} = postList
    const posts = postList.posts
    if (loading) {
      return (
        <div>
          <NewPost />
          <LoadingProgress/>
        </div>
      )
    }
    return (
      <div>
        <NewPost
          submitNewPost={submitNewPost}
        />
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
    resetAllPosts: () => dispatch(resetPosts()),
    changeCurrentMenu: (category, tab) => new Promise(
      (res) => dispatch(setupMenu(category, tab))),
    submitNewPost: (content, category, tab) => {
      dispatch(push(`/category/${category}/${tab}`))
      dispatch(createNewPost(content, category, tab))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles()(AllPostsPage))