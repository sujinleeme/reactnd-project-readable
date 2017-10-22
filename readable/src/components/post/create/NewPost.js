import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { withStyles } from 'material-ui/styles'
import classnames from 'classnames'

import Avatar from 'material-ui/Avatar'
import Input from 'material-ui/Input'
import Card from 'material-ui/Card'
import Chip from 'material-ui/Chip'
import { FormControl, FormHelperText } from 'material-ui/Form'

import PostSaveCancelButton from '../buttons/PostSaveCancelButton'
import { styles } from '../../../styles/post/NewPost'

import { date, username, uuid } from '../../../utils/helper'

class NewPost extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isWriting: false,
      content: {
        id: '',
        timestamp: '',
        title: '',
        body: '',
        author: '',
        category: '',
      },
      checkValid: false,
      isValid: false
    }
  }
  
  componentDidMount = () => {
    const postId = uuid()
    const today = date(Date.now())
    this.setState(
      {content: {...this.state.content, id: postId, timestamp: today}})
  }
  
  handleTitleChange = (e) => {
    this.setState({content: {...this.state.content, title: e.target.value}})
  }
  
  handleBodyChange = (e) => {
    this.setState({content: {...this.state.content, body: e.target.value}})
    
  }
  
  handleExpandForm = () => {
    this.setState({isWriting: true})
  }
  
  initForm = () => {
    this.setState({...this.state, isWriting: false, checkValid: false})
  }
  
  selectCategory = (e) => {
    e.stopPropagation()
    let categoryName = e.target.innerHTML
    if (e.target.tagName !== 'SPAN') {
      categoryName = e.target.childNodes[0].innerHTML
    }
    this.setState({content: {...this.state.content, category: categoryName}})
  }
  
  submitForm = () => {
    const {title, body, category} = this.state.content
    const isFilled = title && body && category ? true : false
    this.setState({checkValid: true, isValid: isFilled})
    // if (content.title && content.body)
    // PARAMS:
    //   id - UUID should be fine, but any unique id will work
    // timestamp - timestamp in whatever format you like, you can use
    // Date.now() if you like title - String body - String author - String
    // category: Any of the categories listed in categories.js. Feel free to
    // extend this
  }
  
  render () {
    const {classes, categories} = this.props
    const {isWriting, checkValid} = this.state
    const {title, body, category} = this.state.content
    
    return (
      <Card className={classes.root}>
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
            <div className={classes.row}>
              {categories ? categories.map(({name, path}) => (
                <Chip key={name}
                      label={name}
                      className={classnames(classes.chip,
                        category === name ? 'active' : '')}
                      onClick={this.selectCategory}
                
                />
              
              )) : null}
              {checkValid && !category ?
                <FormHelperText>Select a category</FormHelperText>
                
                : null}
            </div>
            <FormControl>
              <Input
                placeholder="Title"
                fullWidth="true"
                disableUnderline="true"
                inputProps={{
                  'aria-label': 'title',
                }}
                onChange={this.handleTitleChange}
              />
              {checkValid && !title ?
                <FormHelperText>Title is empty</FormHelperText>
                
                : null}
            
            </FormControl>
            
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
            {checkValid && !body ?
              <FormHelperText>Body is empty</FormHelperText>
              
              : null}
            
            <PostSaveCancelButton
              cancelPost={this.initForm}
              savePost={this.submitForm}
            />
          </div>
          }
        
        </form>
        {/*</CardContent>*/}
      </Card>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // updatePost: (id, option) => {
    //   dispatch(updatePostContent(id, option))
    //   dispatch(getPost(id))
    // }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(NewPost))
