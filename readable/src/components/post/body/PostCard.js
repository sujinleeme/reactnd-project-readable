// react
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import classnames from 'classnames'

// actions
import { date, username } from '../../../utils/helper'
import { getComments } from '../../../modules/actions/comments'
import { changeEditView } from '../../../modules/actions/menu'

// materialUI components
import { withStyles } from 'material-ui/styles'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import ExpandLessIcon from 'material-ui-icons/ExpandLess'
import Card, { CardContent } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import Collapse from 'material-ui/transitions/Collapse'

// components
import PostContent from './PostContent'
import PostVote from '../footer/PostVote'
import NewComment from '../create/NewComment'

// styles
import { styles } from '../../../styles/post/PostCard'

class PostCard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      expanded: false,
      post: this.props.post,
    }
  }
  
  componentDidMount = () => {
    const id = this.props.post.id
    this.props.fetchComments(id)
    
    this.setState(prevState => ({
      shortAuthorName: username(prevState.fullAuthorName),
      date: date(prevState.date),
    }))
  }
  
  handleExpandClick = (e) => {
    e.stopPropagation()
    this.setState({expanded: !this.state.expanded})
  }
  
  handleCommentClick = (e) => {
    e.stopPropagation()
  }
  
  render () {
    const {classes, post, comments} = this.props
    const {expanded} = this.state
    return (
      <div className={classnames(classes.expand, {
        [classes.expandOpen]: expanded,
      })} onClick={this.handleExpandClick}
           aria-expanded={expanded}
           aria-label="Show more"
      >
        <Card className={classes.root}>
          <PostContent
            content={post}
            {...classes}/>
          <div className={classes.footer}>
            <PostVote className={classes.postVote}
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
              {comments.map((comment, index) => (
                <div key={index} className={classes.commentCard}>
                  <PostContent
                    content={comment}
                    {...classes} />
                  <PostVote
                    content={comment}
                    {...classes} />
                
                </div>
              ))}
            </CardContent>
          
          </Collapse>
        </Card>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    comments: state.comments,
    isEditing: state.postsIsEditing,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchComments: (id) => dispatch(getComments(id)),
    changeEditView: (bool) => dispatch(changeEditView(bool)),
  }
}

PostCard.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(withStyles(styles)(PostCard)))