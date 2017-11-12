import React from 'react'
import { withStyles } from 'material-ui/styles'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Card from 'material-ui/Card'
import { getPost, resetPost, getComments } from '../../modules/actions/posts'
import { styles } from '../../styles/post/PostCardList'
import PostDetail from '../post/body/PostDetail'

class PostDetailContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      expanded: false, open: true,
    }
  }
  
  componentWillUnmount () {
    this.props.resetPost()
  }
  
  componentDidMount () {
    const postId = this.props.location.pathname.split('/')[4]
    this.props.fetchPost(postId)
    this.props.fetchComments(postId)
  }
  
  render () {
    const {activePost, comments, activeComment} = this.props
    return (
      <Card>
        <PostDetail
          activePost={activePost}
          activeComment={activeComment}
          comments={comments}
        />
      </Card>
    )
  }
}

const mapStateToProps = (globalState, ownProps) => {
  const {activePost, activeComment} = globalState.posts
  return {
    activePost: activePost.post, comments: activePost.comments,
    activeComment: activeComment.comment, postId: ownProps.id,
    currentMenu: globalState.currentMenu,
    loading: globalState.posts.postList.loading,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPost: (id) => dispatch(getPost(id)),
    fetchComments: (id) => dispatch(getComments(id)),
    resetPost: () => dispatch(resetPost()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(withStyles(styles)(PostDetailContainer)))
