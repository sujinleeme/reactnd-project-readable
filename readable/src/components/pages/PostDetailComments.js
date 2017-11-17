import React from 'react'
import { withStyles } from 'material-ui/styles'
import { connect } from 'react-redux'
import { styles } from '../../styles/post/PostListCard'
import PostContent from '../post/body/PostContent'
import UpDownVoter from '../post/buttons/UpDownVoter'
import { withRouter } from 'react-router-dom'
import * as actions from '../../modules/actions/posts'

const PostDetailComments = (props) => {
  const {classes, comment, deleteCommentContent, updateCommentContent, updateCommentVoter} = props
  return (
    <div className={ classes.commentCard }>
      <div>
        <PostContent
          content={ comment }
          updateBodyContent={ updateCommentContent }
          deleteBodyContent={ deleteCommentContent }
          hideCategoryLabel={ true }
        />
        <UpDownVoter
          content={ comment }
          updateVoteCounter={ updateCommentVoter }
        />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
  }
}

export default connect(mapStateToProps, actions)(
  withRouter(withStyles(styles)(PostDetailComments)))