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
import PostDetail from './PostDetail'

import UpDownVoter from '../buttons/UpDownVoter'
import NewComment from '../create/NewComment'

// styles
import { styles } from '../../../styles/post/PostCardList'

class PostCardList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      expanded: false,
    }
    
    this.handleRequestClose = this.handleRequestClose.bind(this)
  }
  
  componentWillUnmount () {
    // this.props.resetPost()
  }
  
  componentDidMount = () => {
  }
  
  handleExpandClick = (e) => {
    e.stopPropagation()
    this.setState({expanded: !this.state.expanded})
  }
  
  handleCommentClick = (e) => {
    e.stopPropagation()
  }
  
  handleRequestClose = (e) => {
    e.stopPropagation()
    this.setState({expanded: false})
  }
  
  render () {
    const {expanded} = this.state
    const {classes, post, comments} = this.props
    const currentPost = this.props.activePost.post
    
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
            hideDetailView={true}
          />
          
          <div className={classes.footer}>
            <UpDownVoter
              
              className={classes.postVote}
              content={post}
            />
            {!expanded ? <IconButton>
                <ExpandMoreIcon/>
              </IconButton>
              
              : <IconButton>
                <ExpandLessIcon/>
              </IconButton>
            }
          
          </div>
        </Card> : null}
      </div>
    )
  }
}

function mapStateToProps (globalState, ownProps) {
  return {
    activePost: globalState.posts.activePost,
    postId: ownProps.id,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchComments: (id) => dispatch(getComments(id)),
  }
}

PostCardList.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(withStyles(styles)(PostCardList)))
