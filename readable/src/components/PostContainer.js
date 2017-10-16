import React from 'react'
import PropTypes from 'prop-types'
import PostCard from './PostCard'
import { withStyles } from 'material-ui/styles'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Card, {
  CardHeader, CardContent, CardActions,
} from 'material-ui/Card'
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
    if (this.props.postsIsLoading) {
      return <p>Loading…</p>;
    }
  
    return (
      <div className={classes.root}>
        <CardContent>
  
        {postItems.map(post => (
          <PostCard
            key={post.id}
            post={post}
            {...this.props}/>
        ))}
        </CardContent>
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