import React from 'react'
import {withStyles} from 'material-ui/styles'
import {connect} from 'react-redux'
import classnames from 'classnames'
import Card, {CardContent} from 'material-ui/Card'
import {getPost, resetPost} from '../../modules/actions/posts'
import {styles} from '../../styles/post/PostCardList'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import IconButton from 'material-ui/IconButton'
import Collapse from 'material-ui/transitions/Collapse'
import ExpandLessIcon from 'material-ui-icons/ExpandLess'
import PostContent from '../post/body/PostContent'
import UpDownVoter from '../post/buttons/UpDownVoter'
import CommentButton from '../post/buttons/CommentButton'
import NewComment from '../post/create/NewComment'
import LoadingProgress from '../assests/LoadingProgress'
import {changeCategory, changeTab} from '../../modules/actions/menu'
import {withRouter} from 'react-router-dom'
import NotFound from './NotFound'

import {
  updatePostContent, updateCommentContent, getComments, deletePostContent,
  deleteCommentContent, updatePostVoter, updateCommentVoter
} from '../../modules/actions/posts'

class PostDetailPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expanded: true
    }
    this.requestDeletePost = this.requestDeletePost.bind(this)
  }

  componentDidMount() {
    const {id} = this.props.match.params
    this.props.fetchPost(id)
    this.props.fetchComments(id)
  }

  componentWillUnmount() {
    this.props.resetPost()
  }

  requestDeletePost(id, category, tab) {
    console.log(tab)
    this.props.deletePostContent(id, category, tab)
    this.props.history.push(`/category/${category}`)

  }

  handleExpandClick = (e) => {
    e.stopPropagation()
    this.setState({expanded: !this.state.expanded})
  }

  render() {
    const {expanded} = this.state
    const {
            classes, loading, post, comments, updatePostBodyContent, updateCommentBodyContent,
            deleteCommentBodyContent, updatePostVoter, updateCommentVoter
          } = this.props

    if (loading) {
      return (
          <div className={ classes.root }>
            <LoadingProgress/>
          </div>
      )
    }

    return (
        <div>
          { post ? <div>
                { post.id ? <div>
                      <div className={ classnames(classes.expand, {
                        [classes.expandOpen]: expanded
                      }) } onClick={ this.handleExpandClick }
                           aria-expanded={ expanded }
                           aria-label="Show more"
                      >
                        <Card className={ classes.root }>
                          <div>
                            <div>
                              <PostContent
                                  content={ post }
                                  updateBodyContent={ updatePostBodyContent }
                                  deleteBodyContent={ this.requestDeletePost }
                              />
                              <div className={ classes.footer }>
                                <UpDownVoter
                                    className={ classes.postVote }
                                    content={ post }
                                    updateVoteCounter={ updatePostVoter }
                                />

                                { comments ? <CommentButton
                                    comment={ comments }
                                /> : null }
                                { !expanded ? <IconButton>
                                  <ExpandMoreIcon/>
                                </IconButton> : <IconButton>
                                  <ExpandLessIcon/>
                                </IconButton> }

                              </div>
                              <div onClick={ (e) => e.stopPropagation() }>
                                <NewComment/>
                                <Collapse in={ this.state.expanded }
                                          transitionDuration="auto"
                                          unmountOnExit>
                                  <CardContent className={ classes.comments }
                                               onClick={ (e) => e.stopPropagation() }
                                  >
                                    { comments ? <div>
                                      { comments.map((comment, index) => (
                                          <div key={ comment.id }
                                               className={ classes.commentCard }>
                                            <div>
                                              <PostContent
                                                  content={ comment }
                                                  updateBodyContent={ updateCommentBodyContent }
                                                  deleteBodyContent={ deleteCommentBodyContent }
                                                  hideCategoryLabel={ true }
                                              />
                                              <UpDownVoter
                                                  content={ comment }
                                                  updateVoteCounter={ updateCommentVoter }
                                              />
                                            </div>
                                          </div>
                                      )) } </div> : null }
                                  </CardContent>
                                </Collapse>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </div>
                    </div>
                    : <NotFound/> }
              </div>
              : null }
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  const {activePost, activeComment} = state.posts
  return {
    post: activePost.post,
    comments: activePost.comments,
    activeComment: activeComment.comment,
    currentMenu: state.currentMenu,
    loading: state.posts.postList.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPost: (id) => dispatch(getPost(id)),
    fetchComments: (id) => dispatch(getComments(id)),
    resetPost: () => dispatch(resetPost()),
    updatePostBodyContent: (id, content) => {
      dispatch(updatePostContent(id, content))
    },
    updateCommentBodyContent: (id, content, parentId) => {
      dispatch(updateCommentContent(id, content, parentId))
    },
    deletePostContent: (id, category, tab) => {
      dispatch(deletePostContent(id, category, tab))
    },
    deleteCommentBodyContent: (id, category, parentId) => {
      dispatch(deleteCommentContent(id, parentId))
    },
    updatePostVoter: (id, option) => {
      dispatch(updatePostVoter(id, option))
    },
    updateCommentVoter: (id, option, parentId) => {
      dispatch(updateCommentVoter(id, option, parentId))
    },
    changeCategory: (category) => new Promise(
        (res) => dispatch(changeCategory(category))),
    changeTab: (tab) => new Promise(
        (res) => dispatch(changeTab(tab)))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(
    withRouter(withStyles(styles)(PostDetailPage)))