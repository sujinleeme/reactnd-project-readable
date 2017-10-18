import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { withStyles } from 'material-ui/styles'
import Card, {
  CardHeader, CardContent, CardActions,
} from 'material-ui/Card'
import Avatar from 'material-ui/Avatar'
import Button from 'material-ui/Button'

import Typography from 'material-ui/Typography'
import TextField from 'material-ui/TextField'

import PostMenu from './PostMenu'

import { date, username } from '../utils/helper'

import { getComments } from '../modules/menu/actions/comments'
import { changeEditView } from '../modules/menu/actions/menu'

import { styles } from '../styles/PostContent'

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
    const { content, classes} = this.props
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
          <PostMenu className={classes.postMenu}
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
              <Button color="accent" className={classes.button}
                      onClick={this.closePostEdit}>
                cancel
              </Button>
              <Button color="accent" className={classes.button}>
                save
              </Button>
              <form noValidate autoComplete="off">
                {content.title ? <TextField
                  id="required"
                  label="Required"
                  defaultValue={content.title}
                  className={classes.textField}
                  margin="normal"
                /> : null}
                {content.body ? <TextField
                  required
                  id="required"
                  label="Required"
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

PostContent.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(withStyles(styles)(PostContent)))