import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { withStyles } from 'material-ui/styles'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import ExpandLessIcon from 'material-ui-icons/ExpandLess'
import Card from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import PostContent from './PostContent'
import UpDownVoter from '../buttons/UpDownVoter'

import { styles } from '../../../styles/post/PostCardList'
import { updatePostContent, getPost } from '../../../modules/actions/posts'

class PostCardList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      expanded: false,
    }
  }
  
  handleExpandClick = (e) => {
    e.stopPropagation()
    this.setState({expanded: !this.state.expanded})
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
            {!expanded ? <IconButton>
              <ExpandMoreIcon/>
            </IconButton> : <IconButton>
              <ExpandLessIcon/>
            </IconButton>}
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
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PostCardList))