import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {withStyles} from 'material-ui/styles'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import ExpandLessIcon from 'material-ui-icons/ExpandLess'
import Card from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import PostContent from './PostContent'
import UpDownVoter from '../buttons/UpDownVoter'
import CommentButton from '../buttons/CommentButton'
import {getComments} from '../../../modules/actions/posts'
import {styles} from '../../../styles/post/PostCardList'

class PostCardList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expanded: false, comments: []
    }
  }

  componentDidMount() {
    this.props.getComments(this.props.post.id)
  }

  handleExpandClick = (e) => {
    e.stopPropagation()
    this.setState({expanded: !this.state.expanded})
  }

  render() {
    const {expanded} = this.state
    const {classes, post} = this.props
    return (
        <div className={ classnames(classes.expand, {
          [classes.expandOpen]: expanded
        }) } onClick={ this.handleExpandClick }
             aria-expanded={ expanded }
             aria-label="Show more"
        >
          <Card className={ classes.root }>
            <PostContent
                content={ post }
                hideBody={ true }
                hideSetting={ true }
            />
            <div className={ classes.footer }>
              <UpDownVoter
                  className={ classes.postVote }
                  content={ post }
              ></UpDownVoter>
              { post.comments ? <CommentButton
                  comment={ post.comments }
              /> : null }
              { !expanded ? <IconButton>
                <ExpandMoreIcon/>
              </IconButton> : <IconButton>
                <ExpandLessIcon/>
              </IconButton> }
            </div>
          </Card>
        </div>
    )
  }
}

PostCardList.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    comments: state.posts.activePost.comments
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getComments: (id) => new Promise((res) => dispatch(getComments(id)))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(
    withStyles(styles)(PostCardList))