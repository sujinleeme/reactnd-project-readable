import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import ExpandLessIcon from 'material-ui-icons/ExpandLess'
import Card from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import PostContent from '../body/PostContent'
import UpDownVoter from '../buttons/UpDownVoter'
import CommentButton from '../buttons/CommentButton'
import {
  getComments, deletePostsAllUpdate, updateAllPostContent, getPosts
}
  from '../../../modules/actions/posts'
import { styles } from '../../../styles/post/PostCard'

class PostCard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      expanded: false, comments: []
    }
    this.requestUpdatePost = this.requestUpdatePost.bind(this)
    this.requestDeletePost = this.requestDeletePost.bind(this)
  }

  componentDidMount () {
    this.props.getComments(this.props.post.id)
  }

  handleExpandClick = (e) => {
    e.stopPropagation()
    this.setState({expanded: !this.state.expanded})
  }

  requestUpdatePost (id, content) {
    this.props.updatePostBodyContent(id, content, this.props.renderCategory,
      this.props.currentTab)
  }

  requestDeletePost (id) {
    this.props.deletePostBodyContent(id, this.props.renderCategory,
      this.props.currentTab)
  }

  render () {
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
            hideCategoryLabel={ false }
            updateBodyContent={ this.requestUpdatePost }
            deleteBodyContent={ this.requestDeletePost }
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

PostCard.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    comments: state.posts.activePost.comments,
    currentTab: state.currentMenu.tab,
    currentCategory: state.currentMenu.category
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getComments: (id) =>
      new Promise((res) => dispatch(getComments(id))),
    deletePostBodyContent: (id, category, tab) => dispatch(
      deletePostsAllUpdate(id, category, tab)),
    updatePostBodyContent: (id, content, category, tab) => new Promise(
      (res) => dispatch(updateAllPostContent(id, content, category, tab))),
    fetchPosts: (category, tab) => new Promise(
      (res) => dispatch(getPosts(category, tab)))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(styles(PostCard))