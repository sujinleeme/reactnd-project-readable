// react
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classnames from 'classnames'

// actions
import { updatePostContent, getPost } from '../../../modules/actions/posts'

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
    const {classes, post} = this.props
    
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
          ></PostContent>
          <div className={classes.footer}>
            <UpDownVoter
              className={classes.postVote}
              content={post}
            ></UpDownVoter>
            {!expanded ?
              <IconButton>
                <ExpandMoreIcon/>
              </IconButton>
              
              : <IconButton>
                <ExpandLessIcon/>
              </IconButton>
            }
          </div>
        </Card>
      </div>
    )
  }
}


const mapStateToProps = (globalState) => {
  return {
    activePost: globalState.posts.activePost,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updatePostBodyContent: (id, option) => {
      dispatch(updatePostContent(id, option))
      dispatch(getPost(id))
    },
  }
}

PostCardList.propTypes = {
  classes: PropTypes.object.isRequired,
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)
(PostCardList))