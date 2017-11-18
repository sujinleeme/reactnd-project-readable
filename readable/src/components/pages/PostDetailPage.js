import React from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import Card, { CardContent } from 'material-ui/Card'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import IconButton from 'material-ui/IconButton'
import Collapse from 'material-ui/transitions/Collapse'
import ExpandLessIcon from 'material-ui-icons/ExpandLess'
import PostContent from '../post/body/PostContent'
import UpDownVoter from '../post/buttons/UpDownVoter'
import CommentButton from '../post/buttons/CommentButton'
import NewComment from '../post/create/NewComment'
import LoadingProgress from '../assets/LoadingProgress'
import PostDetailComments from './PostDetailComments'
import NotFound from './NotFound'
import { styles } from '../../styles/page/PostDetailPage'
import * as actions from '../../modules/actions/posts'

class PostDetailPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      expanded: true
    }
    this.requestDeletePost = this.requestDeletePost.bind(this)
  }

  componentDidMount () {
    const {id} = this.props.match.params
    this.props.getPost(id)
    this.props.getComments(id)
  }

  componentWillUnmount () {
    this.props.resetPost()
  }

  requestDeletePost (id, category) {
    this.props.deletePostContent(id)
    this.props.history.push(`/category/${category}`)
  }

  handleExpandClick = (e) => {
    e.stopPropagation()
    this.setState({expanded: !this.state.expanded})
  }

  render () {
    const {expanded} = this.state
    const {classes, loading, post, comments, updatePostContent, updatePostVoter} = this.props

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
                          updateBodyContent={ updatePostContent }
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
                                  <PostDetailComments
                                    key={ comment.id }
                                    comment={ comment }
                                  />
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
  const {activePost} = state.posts
  return {
    post: activePost.post,
    comments: activePost.comments,
    loading: state.posts.postList.loading
  }
}

export default connect(mapStateToProps, actions)(styles(PostDetailPage))