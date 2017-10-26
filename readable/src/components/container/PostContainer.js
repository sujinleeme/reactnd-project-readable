import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'
import { connect } from 'react-redux'
import {
  withRouter,
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom'

import PostCardList from '../post/body/PostCardList'
import PostDetail from '../post/body/PostDetail'

import NewPost from '../post/create/NewPost'
import FloatingNewPostButton from '../post/buttons/FloatingNewPostButton'
import LoadingProgress from '../assests/LoadingProgress'

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.A300,
  },
  
})

class PostContainer extends React.Component {
  
  componentDidMount () {
  
  }
  
  render () {
    const {classes, postList, activePost, selectMenu} = this.props
    const {loading} = postList
    const posts = postList.posts
    const currentTab = selectMenu.tab
    const currentCategory = selectMenu.category
    if (loading) {
      return <LoadingProgress/>
    }
    return (
      
      <div className={classes.root}>
        <NewPost/>
        
        {
          posts ? posts.map((post) => (
              <Link
                key={post.id}
                to={{
                  pathname: `/posts/${post.id}`,
                  state: {id: post.id}
                }}
              >
              <PostCardList
                post={post}
                id={post.id}
                key={post.id}
              />
            </Link>
  
          ))
            
            : null}
       
        
        <FloatingNewPostButton/>
  
        
      </div>
    
    )
  }
}

PostContainer.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = (globalState, ownProps) => {
  return {
    postList: globalState.posts.postList,
    selectMenu: {
      category: globalState.currentMenu.category,
      tab: globalState.currentMenu.tab,
    },
    categories: globalState.categories,
    
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
  
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(withStyles(styles)(PostContainer)))