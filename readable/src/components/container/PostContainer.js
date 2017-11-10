import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'
import { connect } from 'react-redux'
import {
  withRouter, Link,
} from 'react-router-dom'

import PostCardList from '../post/body/PostCardList'

import NewPost from '../post/create/NewPost'
import LoadingProgress from '../assests/LoadingProgress'

const styles = theme => ({
  root: {
    flexGrow: 1, backgroundColor: theme.palette.background.A300,
  },
  
})

class PostContainer extends React.Component {

  
  render () {
    const {classes, postList, currentCategory, currentTab} = this.props
    const {loading} = postList
    const posts = postList.posts
    if (loading) {
      
      return (
        <div className={classes.root}>
          <NewPost/>
          <LoadingProgress/>
        </div>
      )
    }
    return (
      
      <div className={classes.root}>
        <NewPost/>
        {posts ? posts.map((post) => (
          <Link
            key={post.id}
            to={{
              pathname: `${currentCategory}=${currentTab}/posts/${post.id}`,
              state: {
                category: currentCategory, tab: currentTab, id: post.id,
              },
            }}
          >
            <PostCardList
              post={post}
              id={post.id}
              key={post.id}
            />
          </Link>
        
        )) : null}
      </div>
    
    )
  }
}

PostContainer.propTypes = {
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
  return {}
  
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(withStyles(styles)(PostContainer)))