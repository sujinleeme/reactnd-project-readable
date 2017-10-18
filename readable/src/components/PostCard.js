import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { withStyles } from 'material-ui/styles'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import IconButton from 'material-ui/IconButton'

import classnames from 'classnames'
import Card, { CardContent } from 'material-ui/Card'
import Collapse from 'material-ui/transitions/Collapse'
import PostContent from './PostContent'
import PostVote from './PostVote'
import NewComment from './NewComment'

import { date, username } from '../utils/helper'
import { getComments } from '../modules/menu/actions/comments'
import { changeEditView } from '../modules/menu/actions/menu'

import { styles } from '../styles/PostCard'

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
            <IconButton>
              <ExpandMoreIcon/>
            </IconButton>
          </div>
          <Collapse in={expanded} transitionDuration="auto"
                    unmountOnExit
          >
            <NewComment/>
            
            <CardContent onClick={this.handleCommentClick}>
              {comments.map((comment, index) => (
                <div key={index}>
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