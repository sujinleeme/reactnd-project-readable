import React from 'react'
import { withStyles } from 'material-ui/styles'
import { connect } from 'react-redux'
import { goBack } from 'react-router-redux'
import classnames from 'classnames'
import Card, { CardContent } from 'material-ui/Card'
import { getPost, resetPost } from '../../modules/actions/posts'
import { styles } from '../../styles/post/PostCardList'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import IconButton from 'material-ui/IconButton'
import Collapse from 'material-ui/transitions/Collapse'
import ExpandLessIcon from 'material-ui-icons/ExpandLess'
import PostContent from '../post/body/PostContent'
import UpDownVoter from '../post/buttons/UpDownVoter'
import CommentButton from '../post/buttons/CommentButton'
import NewComment from '../post/create/NewComment'
import LoadingProgress from '../assests/LoadingProgress'
import { setupMenu } from '../../modules/actions/menu'
import {
  updatePostContent, updateCommentContent, getComments, deletePostContent,
  deleteCommentContent, getPosts, updatePostVoter, updateCommentVoter,
} from '../../modules/actions/posts'

class PostDetailPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      expanded: true,
    }
  }
  
  componentWillUnmount () {
    this.props.resetPost()
  }
  
  componentDidMount () {
    const {category, tab, id} = this.props.match.params
    this.props.fetchPost(id)
    this.props.fetchComments(id)
    return this.props.changeCurrentMenu(category, tab)
  }
  
  handleExpandClick = (e) => {
    e.stopPropagation()
    this.setState({expanded: !this.state.expanded})
  }
  
  render () {
    console.log('ddd')
    const {expanded} = this.state
    const {
            classes, loading, post, comments, updatePostBodyContent, updateCommentBodyContent, deletePostBodyContent, deleteCommentBodyContent, updatePostVoter, updateCommentVoter,
          } = this.props
    
    if (loading) {
      return (
        <div className={classes.root}>
          <LoadingProgress/>
        </div>
      )
    }
    
    return (
      <div className={classnames(classes.expand, {
        [classes.expandOpen]: expanded,
      })} onClick={this.handleExpandClick}
           aria-expanded={expanded}
           aria-label="Show more"
      >
        <Card className={classes.root}>
          <div>
            {post ? <div>
                <PostContent
                  content={post}
                  updateBodyContent={updatePostBodyContent}
                  deleteBodyContent={deletePostBodyContent}
                />
                <div className={classes.footer}>
                  <UpDownVoter
                    className={classes.postVote}
                    
                    content={post}
                    updateVoteCounter={updatePostVoter}
                  />
                  
                  {comments ? <CommentButton
                    comment={comments}
                  /> : null}
                  {!expanded ? <IconButton>
                    <ExpandMoreIcon/>
                  </IconButton> : <IconButton>
                    <ExpandLessIcon/>
                  </IconButton>}
                
                </div>
                <NewComment/>
                <Collapse in={this.state.expanded} transitionDuration="auto"
                          unmountOnExit>
                  <CardContent className={classes.comments}
                               onClick={(e) => e.stopPropagation()}
                  >
                    {comments ? <div>
                      {comments.map((comment, index) => (
                        <div key={comment.id} className={classes.commentCard}>
                          <div>
                            <PostContent
                              content={comment}
                              updateBodyContent={updateCommentBodyContent}
                              deleteBodyContent={deleteCommentBodyContent}
                            />
                            <UpDownVoter
                              content={comment}
                              updateVoteCounter={updateCommentVoter}
                            />
                          </div>
                        </div>
                      ))} </div> : null}
                  </CardContent>
                </Collapse>
              
              
              </div>
              
              : null}
          
          
          </div>
        </Card>
      
      
      </div>
    
    )
  }
}

const mapStateToProps = (globalState, ownProps) => {
  const {activePost, activeComment} = globalState.posts
  return {
    post: activePost.post, comments: activePost.comments,
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
    
    updatePostList: (category) => {
      dispatch(getPosts(category))
    },
    
    updatePostBodyContent: (id, content) => {
      dispatch(updatePostContent(id, content))
      return dispatch(getPost(id))
    },
    
    updateCommentBodyContent: (id, content, parentId) => {
      dispatch(updateCommentContent(id, content))
      return dispatch(getComments(parentId))
    },
    
    deletePostBodyContent: (id, category) => {
      dispatch(deletePostContent(id))
      dispatch(goBack())
      return dispatch(getPosts(category))
    },
    
    deleteCommentBodyContent: (id, category, parentId) => {
      dispatch(deleteCommentContent(id, parentId))
    },
    
    updatePostVoter: (id, option) => {
      dispatch(updatePostVoter(id, option))
      return dispatch(getPost(id))
    },
    
    updateCommentVoter: (id, option, parentId) => {
      dispatch(updateCommentVoter(id, option, parentId))
    },
    
    changeCurrentMenu: (category, tab) => new Promise(
      (res) => dispatch(setupMenu(category, tab))),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(PostDetailPage))
