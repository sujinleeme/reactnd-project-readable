import React from 'react'
import PropTypes from 'prop-types'
import PostCard from '../post/body/PostCard'
import LoadingProgress from '../assests/LoadingProgress'

import { withStyles } from 'material-ui/styles'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.A300,
    padding: '16px',
  },
  
})

class PostContainer extends React.Component {
  
  render () {
    const {classes, posts} = this.props
    if (this.props.postsIsLoading) {
      return <LoadingProgress/>
    }
    
    return (
      <div className={classes.root}>
        {posts.map(post => (
          <PostCard
            key={post.id}
            post={post}
          />
        
        ))}
      </div>
    
    )
  }
}

PostContainer.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts,
    postsIsLoading: state.postsIsLoading,
    
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
  
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(withStyles(styles)(PostContainer)))