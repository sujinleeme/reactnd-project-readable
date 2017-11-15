import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import NewPost from '../post/create/NewPost'
import PostListContainer from '../post/list/PostListContainer'
import LoadingProgress from '../assests/LoadingProgress'
import TabContainer from '../menu/TabContainer'
import { resetPosts, getPosts, createNewPost } from '../../modules/actions/posts'
import { setupMenu } from '../../modules/actions/menu'
import { withStyles } from 'material-ui/styles'
import { push } from 'react-router-redux'


class CategoryPostsPage extends React.Component {
  componentDidMount () {
    const category = this.props.match.params.category
    const tab = this.props.match.params.tab
    return this.props.changeCurrentMenu(category, tab)
    .then(this.props.fetchPosts(category, tab))
  }
  
  componentWillUnmount () {
    this.props.resetPosts()
  }
  
  render () {
    const {postList, currentTab} = this.props
    const {loading} = postList
    const posts = postList.posts
    if (loading) {
      return (
        <div>
          <TabContainer/>
          <NewPost/>
          <LoadingProgress/>
        </div>
      )
    }
    
    return (
      <div>
        <TabContainer/>
        <NewPost/>
        <PostListContainer
          posts={posts}
          tab={currentTab}
        />
      </div>
    )
  }
}

CategoryPostsPage.propTypes = {
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
    changeCurrentMenu: (category, tab) => new Promise(
      (res) => dispatch(setupMenu(category, tab))),
    fetchPosts: (category, tab) => new Promise(
      (res) => dispatch(getPosts(category, tab))),
      resetPosts: () => dispatch(resetPosts()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles()(CategoryPostsPage))