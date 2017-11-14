import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { withRouter, Link } from 'react-router-dom'
import PostCardList from '../body/PostCardList'
import { styles } from '../../../styles/post/PostListContainer'

const PostListContainer = (props) => {
  const {tab, posts, classes} = props
  return (
    <div className={classes.root} >
      {posts ? posts.map((post) => (
        <Link
          key={post.id}
          to={{
            pathname: `/category/${post.category}=${tab}/posts/${post.id}`,
            state: {
              category: post.category, tab: tab, id: post.id,
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

PostListContainer.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(PostListContainer))
