import React from 'react'
import PropTypes from 'prop-types'
import PostCard from './PostCard'
import CreatePost from './CreatePost'
import { withStyles } from 'material-ui/styles'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.A300,
  },
})

class PostContainer extends React.Component {
  
  render () {
    const {classes} = this.props
    const postItems = this.props.posts
    return (
      <div className={classes.root}>
        <CreatePost/>
        {postItems.map(post => (
          <PostCard
            key={post.id}
            post={post}
            {...this.props}/>
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
  
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(withStyles(styles)(PostContainer)))