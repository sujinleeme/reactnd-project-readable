import React from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import NewPost from '../post/create/NewPost'
import PostListContainer from '../post/list/PostListContainer'
import LoadingProgress from '../assests/LoadingProgress'
import { resetPosts, getPosts, createNewPost } from '../../modules/actions/posts'
import { setupMenu } from '../../modules/actions/menu'
import { withStyles } from 'material-ui/styles'

class CategoryPostsPage extends React.Component {
  componentDidMount () {
    const category = this.props.match.params.category
    const tab = this.props.match.params.tab
    return this.props.changeCurrentMenu(category, tab)
    .then(this.props.fetchPosts(category, tab))
  }
  
  componentWillUnmount () {
    this.props.resetAllPosts()
  }
  
  render () {
    const {postList, currentTab, submitNewPost} = this.props
    const {loading} = postList
    const posts = postList.posts
    if (loading) {
      return (
        <div>
          <NewPost
            submitNewPost={submitNewPost}
          />
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
    resetAllPosts: () => dispatch(resetPosts()),
    fetchPosts: (category, tab) => new Promise(
      (res) => dispatch(getPosts(category, tab))),
    submitNewPost: (content, category, tab) => {
      dispatch(push(`/category/${category}/${tab}`))
      dispatch(setupMenu(category, tab))
      return dispatch(createNewPost(content, category, tab))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles()(CategoryPostsPage))