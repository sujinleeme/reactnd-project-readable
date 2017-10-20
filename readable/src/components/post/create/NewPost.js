import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'

import Avatar from 'material-ui/Avatar'
import Input from 'material-ui/Input'
import Card from 'material-ui/Card'

import PostSaveCancelButton from '../buttons/PostSaveCancelButton'
import { styles } from '../../../styles/post/NewPost'

class NewPost extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isWriting: false,
      title: '',
      body: ''
    }
  }
  
  handleTitleChange = (e) => {
    this.setState({title: e.target.value})
  }
  
  handleBodyChange = (e) => {
    this.setState({body: e.target.value})
  }
  
  handleExpandForm = () => {
    this.setState({isWriting: true})
  }
  
  initForm = () => {
    this.setState({isWriting: false, title: '', body: ''})
  }
  
  render () {
    const {classes} = this.props
    const isWriting = this.state.isWriting
    return (
      <Card className={classes.root}>
        {/*<CardContent className={classes.content}>*/}
          <Avatar className={classes.avatar}>GU</Avatar>
          <form noValidate autoComplete="off" className={classes.form}>
            {!isWriting ? <Input
              placeholder="Share your story"
              fullWidth="true"
              disableUnderline="true"
              inputProps={{
                'aria-label': 'title',
              }}
              onClick={this.handleExpandForm}
            /> : <div className={classes.inputField}>
              <Input
                placeholder="Title"
                fullWidth="true"
                disableUnderline="true"
                inputProps={{
                  'aria-label': 'title',
                }}
                onChange={this.handleTitleChange}
              />
              <Input
                placeholder="Body"
                fullWidth="true"
                disableUnderline="true"
                inputProps={{
                  'aria-label': 'body',
                }}
                multiline="true"
                onChange={this.handleBodyChange}
              />
              <PostSaveCancelButton
                cancelPost={this.initForm}
                // savePost={}
              />
            </div>
            }
          
          </form>
        {/*</CardContent>*/}
      </Card>
    )
  }
}

export default withStyles(styles)(NewPost)