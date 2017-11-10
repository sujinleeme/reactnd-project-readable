import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import CloseIcon from 'material-ui-icons/Close'
import Dialog, { DialogActions, DialogContent } from 'material-ui/Dialog'
import { withStyles } from 'material-ui/styles'
import Card, { CardContent } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import Collapse from 'material-ui/transitions/Collapse'
import UpDownVoter from '../buttons/UpDownVoter'
import NewComment from '../create/NewComment'
import PostContent from './PostContent'
import { styles } from '../../../styles/post/PostCardList'

import {
  updatePostContent, getPost, updateCommentContent, getComment, getComments,
  deletePostContent, deleteCommentContent, getPosts, updatePostVoter,
  updateCommentVoter,
} from '../../../modules/actions/posts'

class PostDetail extends React.Component {
  state = {
    open: true,
  }
  
  handleRequestClose = () => {
    const {currentCategory, updatePostList} = this.props
    this.setState({open: false})
  }
  
  render () {
    const { classes, activePost, activeComment, comments, updatePostBodyContent,
            updateCommentBodyContent, deletePostBodyContent, deleteCommentBodyContent,
            updatePostVoter, currentCategory, currentTab, updateCommentVoter,
          } = this.props
    
    return (
      <Card>
        {activePost ? <Dialog fullWidth={true} open={this.state.open}>
          <DialogActions>
            <Link
              to={{
                pathname: `/category/${currentCategory}=${currentTab}`, state: {
                  category: currentCategory, tab: currentTab,
                },
              }}
            >
              <IconButton className={classes.close}
                          onClick={this.handleRequestClose} aria-label="Delete">
                <CloseIcon/>
              </IconButton>
            </Link>
          </DialogActions>
          <DialogContent>
            <div>
              <PostContent
                content={activePost}
                updateBodyContent={updatePostBodyContent}
                deleteBodyContent={deletePostBodyContent}
              />
              <UpDownVoter
                content={activePost}
                updateVoteCounter={updatePostVoter}
              />
              <NewComment/>
            </div>
            
            <Collapse in={this.state.open} transitionDuration="auto"
                      unmountOnExit
            >
              <CardContent className={classes.comments}
                           onClick={this.handleCommentClick}>
                {comments ? <div>
                  {comments.map((comment, index) => (
                    <div key={comment.id} className={classes.commentCard}>
                      {activeComment && (activeComment.id === comment.id) ?
                        <div>
                          <PostContent
                            content={activeComment}
                            updateBodyContent={updateCommentBodyContent}
                            deleteBodyContent={deleteCommentBodyContent}
                          />
                          <UpDownVoter
                            content={activeComment}
                            updateVoteCounter={updateCommentVoter}
                          />
                        </div> : <div>
                          <PostContent
                            content={comment}
                            updateBodyContent={updateCommentBodyContent}
                            deleteBodyContent={deleteCommentBodyContent}
                          />
                          <UpDownVoter
                            content={comment}
                            updateVoteCounter={updateCommentVoter}
                          />
                        </div>}
                    </div>
                  ))} </div> : null}
              </CardContent>
            </Collapse>
          </DialogContent>
        </Dialog> : null}
      </Card>
    )
  }
}

PostDetail.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  return {
    currentCategory: state.currentMenu.category,
    currentTab: state.currentMenu.tab,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    
    updatePostList: (category) => {
      dispatch(getPosts(category))
    },
    
    updatePostBodyContent: (id, content) => {
      dispatch(updatePostContent(id, content))
      return dispatch(getPost(id))
    },
    
    updateCommentBodyContent: (id, content, parentId) => {
      dispatch(updateCommentContent(id, content))
      dispatch(getComment(id))
      return dispatch(getComments(parentId))
    },
    
    deletePostBodyContent: (id, category) => {
      dispatch(deletePostContent(id))
      dispatch(getPosts(category))
      return window.history.back()
    },
    
    deleteCommentBodyContent: (id, category, parentId) => {
      dispatch(deleteCommentContent(id))
      return dispatch(getComments(parentId))
    },
    
    updatePostVoter: (id, option) => {
      dispatch(updatePostVoter(id, option))
      return dispatch(getPost(id))
    },
    
    updateCommentVoter: (id, option) => {
      dispatch(updateCommentVoter(id, option))
      return dispatch(getComment(id))
    },
  }
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PostDetail)))