import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import PostCard from './PostCard'
import { styles } from '../../../styles/post/PostListContainer'

const PostListContainer = (props) => {
  const {tab, posts, classes} = props
  return (
    <div className={ classes.root }>
      { posts ? posts.map((post) => (
        <Link
          key={ post.id }
          to={ {
            pathname: `/posts/${post.id}`,
            state: {
              category: post.category, tab: tab, id: post.id
            }
          } }
        >
          <PostCard
            post={ post }
            id={ post.id }
            key={ post.id }
            renderCategory={ props.category }
          />
        </Link>
      )) : null }
    </div>
  )
}

PostListContainer.propTypes = {
  classes: PropTypes.object.isRequired
}

export default styles(PostListContainer)