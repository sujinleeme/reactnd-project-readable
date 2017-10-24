import React from 'react'
import PropTypes from 'prop-types'


import { withStyles } from 'material-ui/styles'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'


import PostCard from '../post/body/PostCard'
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
    const {classes, postList,activePost} = this.props
    const {posts, loading} = postList
    if (loading) {
      return <LoadingProgress/>
    }
    return (
      <div className={classes.root}>
          <NewPost />
        {
          posts ? posts.map((post) => (

              <PostCard
                key={post.id}
                post={post}
                id={post.id}
              
              />
          
          )) : null}
        <FloatingNewPostButton />

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
  
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
  
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(withStyles(styles)(PostContainer)))