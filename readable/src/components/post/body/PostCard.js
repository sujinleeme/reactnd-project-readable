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
      upVote: false,
      downVote: false,
      
    }
    this.handleClickUpVote = this.handleClickUpVote.bind(this)
    this.handleClickDownVote = this.handleClickDownVote.bind(this)
    
  }
  
  componentWillUnmount () {
    this.props.resetPost()
  }
  
  componentDidMount = () => {
    const postId = this.props.id
    this.props.fetchPost(postId)
    this.props.fetchComments(postId)
    // this.setState(prevState => ({
    //   shortAuthorName: username(prevState.fullAuthorName),
    //   date: date(prevState.date),
    // }))
  }
  
  handleExpandClick = (e) => {
    e.stopPropagation()
    this.setState({expanded: !this.state.expanded})
  }
  
  handleCommentClick = (e) => {
    e.stopPropagation()
  }
  
  handleClickUpVote = (e, type) => {
    const id = this.state.id
    e.stopPropagation()
    this.setState({upVote: !this.state.upVote})
    
    if (this.state.downVote) {
      this.setState({downVote: false})
    }
    if (this.state.upVote) {
      this.props.updatePostVote(id, 'downVote')
    }
    if (!this.state.upVote) {
      this.props.updatePostVote(id, 'upVote')
    }
    console.log(this.props.VoteIsUpdated)
    
  }
  handleClickDownVote = (e) => {
    const id = this.state.id
    e.stopPropagation()
    
    this.setState({downVote: !this.state.downVote})
    if (this.state.upVote) {
      this.setState({upVote: false})
    }
    
    if (this.state.downVote) {
      this.props.updatePostVote(id, 'upVote')
    }
    if (!this.state.downVote) {
      this.props.updatePostVote(id, 'downVote')
    }
  }
  
  render () {
    const {expanded} = this.state
    const {classes, activePost} = this.props
    const {post, comments, loading, error} = activePost
    
    
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
    activePost: globalState.posts.activePost,
    id: ownProps.id,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updatePostVote: (id, option) => dispatch(updateVote(id, option)),
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