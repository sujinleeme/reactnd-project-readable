import React from 'react'
import { connect } from 'react-redux'

import PropTypes from 'prop-types'
import CloseIcon from 'material-ui-icons/Close'

import { styles } from '../../../styles/post/PostCardList'

import UpDownVoter from '../buttons/UpDownVoter'
import NewComment from '../create/NewComment'

import PostContent from './PostContent'

// materialUI components
import Dialog, {
  DialogActions, DialogContent,
} from 'material-ui/Dialog'
import { withStyles } from 'material-ui/styles'
import Card, { CardContent } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import Collapse from 'material-ui/transitions/Collapse'

import {
  updatePostContent, getPost, updateCommentContent, getComment, getComments,
  deletePostContent, deleteCommentContent, getPostLists,
} from '../../../modules/actions/posts'

class PostDetail extends React.Component {
  state = {
    open: true,
  }
  
  handleClickOpen = () => {
    this.setState({open: true})
  }
  
  handleRequestClose = () => {
    this.setState({open: false})
    window.history.back()
  }
  
  render () {
    const {classes, activePost, activeComment, comments, updatePostBodyContent, updateCommentBodyContent, deletePostBodyContent, deleteCommentBodyContent} = this.props
    
    return (
      <Card>
        {activePost ? <Dialog fullWidth={true} open={this.state.open}>
          <DialogActions>
            <IconButton className={classes.close}
                        onClick={this.handleRequestClose} aria-label="Delete">
              <CloseIcon/>
            </IconButton>
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
                          />
                        </div> : <div>
                          <PostContent
                            content={comment}
                            updateBodyContent={updateCommentBodyContent}
                            deleteBodyContent={deleteCommentBodyContent}
                          />
                          <UpDownVoter
                            content={comment}
                          
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updatePostBodyContent: (id, content) => {
      dispatch(updatePostContent(id, content))
      dispatch(getPost(id))
    },
    
    updateCommentBodyContent: (id, content, parentId) => {
      dispatch(updateCommentContent(id, content))
      dispatch(getComment(id))
      return dispatch(getComments(parentId))
    },
    
    deletePostBodyContent: (id, category) => {
      dispatch(deletePostContent(id))
      dispatch(getPostLists(category))
      return window.history.back()
    },
    
    deleteCommentBodyContent: (id, category, parentId) => {
      dispatch(deleteCommentContent(id))
      return dispatch(getComments(parentId))
      // return new Promise((res) => {
      //   res(getComments(parentId))
      // })
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(PostDetail))