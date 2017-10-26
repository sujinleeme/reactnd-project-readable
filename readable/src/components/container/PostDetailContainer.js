import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { withStyles } from 'material-ui/styles'
import { connect } from 'react-redux'
import {
  withRouter,
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom'
import { parse } from 'qs'


import {
  getPost, updateVote, resetPost, getComments,
} from '../../modules/actions/posts'


import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import ExpandLessIcon from 'material-ui-icons/ExpandLess'
import Card, { CardContent } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import Collapse from 'material-ui/transitions/Collapse'

import PostCardList from '../post/body/PostCardList'
import PostContainer from './PostContainer'

import PostContent from '../post/body/PostContent'
import UpDownVoter from '../post/buttons/UpDownVoter'
import PostDetail from '../post/body/PostDetail'

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.A300,
  },
  
})

class PostDetailContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      expanded: false,
    }
  }
  
  componentWillUnmount () {
    this.props.resetPost()
  }
  
  componentDidMount () {
    const postId = this.props.location.pathname.split('/')[2]
    this.props.fetchPost(postId)
    this.props.fetchComments(postId)
  
  }
  
  
  handleExpandClick = (e) => {
    e.stopPropagation()
    this.setState({expanded: !this.state.expanded})
  }
  
  handleCommentClick = (e) => {
    e.stopPropagation()
  }
  
  
  render () {
    const {expanded} = this.state
    const {classes, activePost} = this.props
    const {post, comments} = activePost
    
    return (
      <div>
        <PostContainer/>
        <PostDetail/>
      </div>
    )
  }
}


const mapStateToProps = (globalState, ownProps) => {
  return {
    postList: globalState.posts.postList,
    selectMenu: {
      category: globalState.currentMenu.category,
      tab: globalState.currentMenu.tab,
    },
    categories: globalState.categories,
    activePost: globalState.posts.activePost,
  
  
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPost: (id) => dispatch(getPost(id)),
    fetchComments: (id) => dispatch(getComments(id)),
    resetPost: () => dispatch(resetPost()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(withStyles(styles)(PostDetailContainer)))