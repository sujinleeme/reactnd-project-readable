// react
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import classnames from 'classnames'

// actions
// import { getComments } from '../../../modules/actions/comments'
import {
  getPost, updateVote, resetPost, getComments,
} from '../../../modules/actions/posts'

// materialUI components
import { withStyles } from 'material-ui/styles'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import ExpandLessIcon from 'material-ui-icons/ExpandLess'
import Card, { CardContent } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import Collapse from 'material-ui/transitions/Collapse'

// components
import PostContent from './PostContent'
import UpDownVoter from '../buttons/UpDownVoter'
import NewComment from '../create/NewComment'

// styles
import { styles } from '../../../styles/post/PostCard'

class PostCard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      expanded: false,
    }
  }
  
  componentWillUnmount () {
    this.props.resetPost()
  }
  
  componentDidMount = () => {
    const postId = this.props.id
    // this.props.fetchPost(postId)
    // this.props.fetchComments(postId)
  }
  
  handleExpandClick = (e) => {
    e.stopPropagation()
    this.setState({expanded: !this.state.expanded})
  }
  
  handleCommentClick = (e) => {
    e.stopPropagation()
  }
  
  changeUpdatedPostContent = () => {
    // decide inner contents if item content is updated
    let post = this.props.post
    const activePost = this.props.activePost
    if (activePost) {
      if (activePost.id === post.id) {
        post = activePost
      }
    }
    return post
  }
  render () {
    const {expanded} = this.state
    const {classes, activePost, comments} = this.props
    const post = this.changeUpdatedPostContent()
   
    return (
      <div className={classnames(classes.expand, {
        [classes.expandOpen]: expanded,
      })} onClick={this.handleExpandClick}
           aria-expanded={expanded}
           aria-label="Show more"
      >
        {post ? <Card className={classes.root}>
          <PostContent
            content={post}
            {...classes}/>
          <div className={classes.footer}>
            <UpDownVoter className={classes.postVote}
                         content={post}
                         {...classes}/>
            
            {!expanded ? <IconButton>
                <ExpandMoreIcon/>
              </IconButton>
              
              : <IconButton>
                <ExpandLessIcon/>
              </IconButton>
            }
          
          </div>
          <Collapse in={expanded} transitionDuration="auto"
                    unmountOnExit
          >
            
            
            <CardContent className={classes.comments}
                         onClick={this.handleCommentClick}>
              <NewComment/>
              {comments ? <div>
                {comments.map((comment, index) => (
                  <div key={index} className={classes.commentCard}>
                    <PostContent
                      content={comment}
                      {...classes} />
                    <UpDownVoter
                      content={comment}
                      {...classes}
                    />
                  
                  </div>
                
                ))} </div> : null}
            </CardContent>
          
          </Collapse>
        </Card> : null}
      </div>
    )
  }
}

function mapStateToProps (globalState, ownProps) {
  return {
    activePost: globalState.posts.activePost.post,
    id: ownProps.id,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPost: (id) => dispatch(getPost(id)),
    fetchComments: (id) => dispatch(getComments(id)),
    resetPost: () => dispatch(resetPost()),
  }
}

PostCard.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(withStyles(styles)(PostCard)))
