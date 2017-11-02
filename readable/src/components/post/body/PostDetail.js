import React from 'react'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CloseIcon from 'material-ui-icons/Close'
import classnames from 'classnames'
import { withRouter, Link, Route } from 'react-router-dom'

import { styles } from '../../../styles/post/PostCardList'
import Grid from 'material-ui/Grid'

import {
  getPost, updateVote, resetPost, getComments,
} from '../../../modules/actions/posts'

import UpDownVoter from '../buttons/UpDownVoter'
import NewComment from '../create/NewComment'

import PostContent from './PostContent'

// materialUI components
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog'
import { withStyles } from 'material-ui/styles'
import Card, { CardContent } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import Collapse from 'material-ui/transitions/Collapse'

class PostDetail extends React.Component {
  state = {
    open: true,
  }
  
  handleClickOpen = () => {
    this.setState({open: true})
  }
  
  handleRequestClose = () => {
    this.setState({open: false})
  }
  
  componentWillUnmount () {
    this.props.resetPost()
  }
  
  componentDidMount () {
    
  }
  
  render () {
    const {classes, activePost, currentMenu} = this.props
    const {post, comments} = activePost
    return (
      <Card>
        <Dialog fullWidth={true} open={this.state.open}>
          <Link to={{
            pathname: `/category/${currentMenu.category}?=${currentMenu.tab}`,
            state: {category: currentMenu.category, tab: currentMenu.tab},
          }}>
            <DialogActions>
              <IconButton className={classes.close}
                          onClick={this.handleRequestClose} aria-label="Delete">
                <CloseIcon/>
              </IconButton>
            </DialogActions>
          </Link>
          <DialogContent>
            {post ? <div>
                <PostContent
                  content={post}
                
                />
                <UpDownVoter
                  content={post}
                />
              </div>
              : null
            }
            <Collapse in={this.state.open} transitionDuration="auto"
                      unmountOnExit
            >
              
              <CardContent className={classes.comments}
                           onClick={this.handleCommentClick}>
                
                <NewComment/>
                
                {comments ? <div>
                  {comments.map((comment, index) => (
                    <div key={index} className={classes.commentCard}>
                      <PostContent
                        content={comment}/>
                      <UpDownVoter
                        content={comment}
                      />
                    
                    </div>
                  
                  ))} </div> : null}
              </CardContent>
            
            </Collapse>
          </DialogContent>
        
        </Dialog>
      </Card>
    )
  }
}

const mapStateToProps = (globalState, ownProps) => {
  return {
    activePost: globalState.posts.activePost,
    postId: ownProps.id,
    currentMenu: globalState.currentMenu,
    
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchPost: (id) => dispatch(getPost(id)),
    fetchComments: (id) => dispatch(getComments(id)),
    resetPost: () => dispatch(resetPost()),
  }
}

PostDetail.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(PostDetail))
