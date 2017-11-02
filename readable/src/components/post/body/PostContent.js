import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { withStyles } from 'material-ui/styles'
import classnames from 'classnames'

import { CardHeader, CardContent } from 'material-ui/Card'
import Avatar from 'material-ui/Avatar'

import Typography from 'material-ui/Typography'
import Input from 'material-ui/Input'

import PostSettingButton from '../buttons/PostSettingButton'
import PostSaveCancelButton from '../buttons/PostSaveCancelButton'

import { date, username } from '../../../utils/helper'
import { updatePostContent, getPost } from '../../../modules/actions/posts'

import { styles } from '../../../styles/post/PostContent'

class PostContent extends React.Component {
  constructor (props) {
    super(props)
    
    this.state = {
      date: this.props.content.timestamp,
      fullAuthorName: this.props.content.author,
      shortAuthorName: '',
      title: this.props.content.title,
      body: this.props.content.body,
      isEditing: false,
    }
    
  }
  
  componentDidMount = () => {
    const id = this.props.content.id
    this.setState(prevState => ({
      shortAuthorName: username(prevState.fullAuthorName),
      date: date(prevState.date),
    }))
  }
  
  sendUpdatedPost = (e) => {
    e.stopPropagation()
    const id = this.props.content.id
    const content = {title: this.state.title, body: this.state.body}
    this.props.updatePost(id, content)
    return this.changeEditView(false)
  }
  
  closePostEditView = (e) => {
    e.stopPropagation()
    this.changeEditView(false)
  }
  
  changeEditView = (bool) => {
    this.setState({isEditing: bool})
  }
  
  deletePostItem = (e) => {
    e.stopPropagation()
  }
  
  handleTitleChange = (e) => {
    this.setState({title: e.target.value})
  }
  
  handleBodyChange = (e) => {
    this.setState({body: e.target.value})
  }
  
  render () {
    const {content, classes, activePost, hideDetailView} = this.props
    const {fullAuthorName, shortAuthorName, isEditing} = this.state
    
    return (
      <div>
        <div className={classes.root}>
          <CardHeader className={classes.cardHeader}
                      avatar={
                        <Avatar aria-label="post" className={classes.avatar}>
                          {shortAuthorName}
                        </Avatar>
                      }
                      title={fullAuthorName}
                      subheader={this.state.date}
          />
          
          {hideDetailView ? null :
            <PostSettingButton className={classes.postMenu}
                               showPostEditView={this.changeEditView}
                               deletePost={this.deletePostItem}
            />
          }
        </div>
        
        {
          !isEditing ? <CardContent>
              <Typography type="subheading" component="h6">
                {content.title}
              </Typography>
              <Typography component="p">
                {content.body}
              </Typography>
            </CardContent>
            
            : <CardContent>
              <PostSaveCancelButton
                cancelPost={this.closePostEditView}
                savePost={this.sendUpdatedPost}
              />
              <form noValidate autoComplete="off"
                    onClick={(e) => {
                      e.stopPropagation()
                    }}>
                {content.title ? <Input
                  placeholder="Write down your post title..."
                  fullWidth="true"
                  disableUnderline="true"
                  onChange={this.handleTitleChange}
                  defaultValue={content.title}
                  className={classes.textField}
                  margin="normal"
                /> : null}
                {content.body ? <Input
                  placeholder="What do you want to say..."
                  multiline="true"
                  fullWidth="true"
                  disableUnderline="true"
                  onChange={this.handleBodyChange}
                  defaultValue={content.body}
                  className={classes.textField}
                  margin="normal"
                /> : null}
              </form>
            </CardContent>
        }
      </div>
    
    )
  }
}

function mapStateToProps (globalState, state) {
  return {
    activePost: globalState.posts.activePost,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updatePost: (id, option) => {
      dispatch(updatePostContent(id, option))
      dispatch(getPost(id))
    },
  }
}

PostContent.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)
(PostContent))