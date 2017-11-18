import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { resetPosts, getPosts } from '../../modules/actions/posts'
import { changeTab, changeCategory } from '../../modules/actions/menu'
import PostListContainer from '../post/list/PostListContainer'
import TabContainer from '../menu/TabContainer'
import NewPost from '../post/create/NewPost'
import LoadingProgress from '../assets/LoadingProgress'

class AllPostsPage extends React.Component {
  componentDidMount () {
    this.props.changeTab('new')
    return this.props.changeCategory('all').then(
      this.props.fetchPosts('all', 'new')
    )
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
          posts={ posts }
          category={ 'all' }
          tab={ currentTab }
        />
      </div>
    )
  }
}

AllPostsPage.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    postList: state.posts.postList,
    currentCategory: state.currentMenu.category,
    currentTab: state.currentMenu.tab
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeTab: (tab) => dispatch(changeTab(tab)),
    changeCategory: (category) => new Promise(
      (res) => dispatch(changeCategory(category))),
    fetchPosts: (category, tab) => new Promise(
      (res) => dispatch(getPosts(category, tab))),
    resetPosts: () => dispatch(resetPosts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllPostsPage)