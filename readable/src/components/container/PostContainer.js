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
    padding: theme.spacing.unit * 3,
  },
  
})

class PostContainer extends React.Component {
  
  componentDidMount () {
  
  }
  
  renderPosts (posts) {
    return posts.map(post => (
      <PostCard
        key={post.id}
      
      />
    
    ))
  }
  
  render () {
    const {classes, postsList} = this.props
    const {posts, loading} = postsList
    if (loading) {
      return <LoadingProgress/>
    }
    
    return (
      <div className={classes.root}>
        {
          posts ? posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              id={post.id}
            
            />
          
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
    postsList: state.posts.postsList,
    
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
  
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(withStyles(styles)(PostContainer)))