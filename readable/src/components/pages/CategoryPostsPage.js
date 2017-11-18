import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import NewPost from '../post/create/NewPost'
import PostListContainer from '../post/list/PostListContainer'
import LoadingProgress from '../assets/LoadingProgress'
import TabContainer from '../menu/TabContainer'
import { resetPosts, getPosts } from '../../modules/actions/posts'
import { changeCategory, changeTab } from '../../modules/actions/menu'

class CategoryPostsPage extends React.Component {
  componentDidMount () {
    let tab
    const category = this.props.match.params.category
    tab = this.props.currentTab
    if (!tab) {
      tab = 'new'
    }
    return this.changePostList(category, tab)
  }

  componentWillReceiveProps (nextProps) {
    const {location} = this.props
    const locationChanged = nextProps.location !== location
    if (locationChanged && nextProps.location.state) {
      const category = nextProps.location.state.category
      const tab = nextProps.location.state.tab
      return this.changePostList(category, tab)
    }
  }

  changePostList (category, tab) {
    this.props.changeCategory(category)
    this.props.changeTab(tab).then(
      this.props.fetchPosts(category, tab)
    )
  }

  componentWillUnmount () {
    this.props.resetPosts()
  }

  render () {
    const {postList, currentTab, currentCategory} = this.props
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
          category={ currentCategory }
          tab={ currentTab }
        />
      </div>
    )
  }
}

CategoryPostsPage.propTypes = {
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
    changeCategory: (category) => new Promise(
      (res) => dispatch(changeCategory(category))),
    changeTab: (tab) => new Promise(
      (res) => dispatch(changeTab(tab))),
    fetchPosts: (category, tab) => new Promise(
      (res) => dispatch(getPosts(category, tab))),
    resetPosts: () => dispatch(resetPosts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPostsPage)