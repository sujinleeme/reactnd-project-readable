import React from 'react'
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
import { date, uuid } from '../../../utils/utils'

class NewPost extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isWriting: false, content: {
        id: '', timestamp: '', title: '', body: '', author: '', category: '',
      }, date: '', checkValid: false, isValid: false,
    }
  }
  
  componentDidMount = () => {
    this.updateDateTime()
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
  //
  initForm = () => {
    this.setState({
      ...this.state, isWriting: false, content: {
        id: '', timestamp: '', title: '', body: '', author: '', category: '',
      }, date: '', checkValid: false,
    })
  }
  
  selectCategory = (e) => {
    e.stopPropagation()
    let categoryName = e.target.innerHTML
    if (e.target.tagName !== 'SPAN') {
      categoryName = e.target.childNodes[0].innerHTML
    }
    this.setState({content: {...this.state.content, category: categoryName}})
  }
  
  updateDateTime = () => {
    const postId = uuid()
    const today = Date.now()
    const convertedTimestamp = date(today)
    this.setState({
      content: {
        ...this.state.content, author: postId, id: postId, timestamp: today,
      }, date: convertedTimestamp,
    })
    
  }
  
  requestForm = () => {
    this.updateDateTime()
    const isValid = this.checkEmptyFields()
    if (isValid) {
      return Promise.resolve()
      .then(() => this.submitPost())
      .then(() => this.initForm())
    }
  }
  
  submitPost = () => {
    const content = this.state.content
    const selectedCategory = content.category
    this.props.submitNewPost(content, selectedCategory, this.props.currentTab)
  }
  
  checkEmptyFields = () => {
    const {title, body, category} = this.state.content
    const isFilled = title && body && category ? true : false
    this.setState({checkValid: true})
    return isFilled
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
            <div className={classes.categorybuttons}>
              <div className={classes.row}>
                {categories ? categories.map(({name, path}) => (
                  <Chip key={name}
                        label={name}
                        className={classnames(classes.chip,
                          category === name ? classes.active : '')}
                        onClick={this.selectCategory}
                  />
                )) : null} </div>
              {checkValid && !category ?
                <FormHelperText className={classes.error}>Choose a
                  category</FormHelperText> : null}</div>
            <FormControl className={classes.inputTitle}>
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
                <FormHelperText className={classes.error}>Title is
                  empty</FormHelperText> : null}
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
              <FormHelperText className={classes.error}>Body is
                empty</FormHelperText> : null}
            <PostSaveCancelButton
              cancelPost={this.initForm}
              savePost={this.requestForm}
            />
          </div>}
        </form>
      </Card>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
    currentCategory: state.currentMenu.category,
    currentTab: state.currentMenu.tab,
  }
}

const mapDispatchToProps = (dispatch) => {
  return { }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(NewPost))
