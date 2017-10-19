import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { withStyles } from 'material-ui/styles'
import { CardHeader, CardContent } from 'material-ui/Card'
import Avatar from 'material-ui/Avatar'

import Typography from 'material-ui/Typography'
import Input from 'material-ui/Input'

import PostEditButton from '../buttons/PostEditButton'
import PostSaveCancelButton from '../buttons/PostSaveCancelButton'

import { date, username } from '../../../utils/helper'

import { getComments } from '../../../modules/actions/posts'

import { styles } from '../../../styles/post/PostContent'

class PostContent extends React.Component {
  state = {
    date: this.props.content.timestamp,
    fullAuthorName: this.props.content.author,
    shortAuthorName: '',
    isEditing: false,
  }
  
  componentDidMount = () => {
    const id = this.props.content.id
    this.setState(prevState => ({
      shortAuthorName: username(prevState.fullAuthorName),
      date: date(prevState.date),
    }))
  }
  
  closePostEdit = (e) => {
    e.stopPropagation()
    this.changeEditView(false)
  }
  
  changeEditView = (bool) => {
    this.setState({isEditing: bool})
  }
  
  render () {
    const {content, classes} = this.props
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
          <PostEditButton className={classes.postMenu}
                          changeEditView={this.changeEditView}
          />
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
                cancelPost={this.closePostEdit}
              />
              <form noValidate autoComplete="off">
                {content.title ? <Input
                  placeholder="Write down your post title..."
                  fullWidth="true"
                  disableUnderline="true"
                  inputProps={{
                    'aria-label': 'Description',
                  }}
                  defaultValue={content.title}
                  className={classes.textField}
                  margin="normal"
                /> : null}
                {content.body ? <Input
                  placeholder="What do you want to say..."
                  multiline="true"
                  fullWidth="true"
                  disableUnderline="true"
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




function mapStateToProps(globalState, ownProps) {
  return {
    activePost: globalState.posts.activePost,
    id: ownProps.id
  };
}

//
// const mapStateToProps = (state) => {
//   return {
//     comments: state.comments,
//     voteIsUpdating: state.voteIsUpdating,
//
//   }
// }

const mapDispatchToProps = (dispatch) => {
  return {
    fetchComments: (id) => dispatch(getComments(id)),
  }
}

PostContent.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(PostContent))