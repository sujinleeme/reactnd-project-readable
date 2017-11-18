import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { CardHeader, CardContent } from 'material-ui/Card'
import Avatar from 'material-ui/Avatar'
import Typography from 'material-ui/Typography'
import Input from 'material-ui/Input'
import Button from 'material-ui/Button'
import PostSettingButton from '../buttons/PostSettingButton'
import PostSaveCancelButton from '../buttons/PostSaveCancelButton'
import { date, username } from '../../../utils/utils'
import { styles } from '../../../styles/post/PostContent'

class PostContent extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      date: this.props.content.timestamp,
      fullAuthorName: this.props.content.author,
      shortAuthorName: '',
      title: this.props.content.title,
      category: this.props.content.category,
      body: this.props.content.body,
      isEditing: false
    }

    this.changeEditView = this.changeEditView.bind(this)
  }

  componentDidMount = () => {
    this.setState(prevState => (
      {
        shortAuthorName: username(prevState.fullAuthorName),
        date: date(prevState.date)
      }
    ))
  }

  offOnClickEvent = (e) => {
    if (this.state.isEditing) {
      e.stopPropagation()
      e.preventDefault()
      e.nativeEvent.stopImmediatePropagation()
    }
  }

  sendUpdatedPost = (e) => {
    e.stopPropagation()
    e.preventDefault()
    e.nativeEvent.stopImmediatePropagation()
    const {id, parentId} = this.props.content
    const body = {title: this.state.title, body: this.state.body}
    this.props.updateBodyContent(id, body, parentId)
    return this.changeEditView(false)
  }

  closePostEditView = (e) => {
    e.preventDefault()
    e.nativeEvent.stopImmediatePropagation()
    e.stopPropagation()
    this.changeEditView(false)
  }

  changeEditView = (bool) => {
    this.setState({isEditing: bool})
    console.log(this.props.openPostEditView)
  }

  handleTitleChange = (e) => {
    this.setState({title: e.target.value})
  }

  handleBodyChange = (e) => {
    this.setState({body: e.target.value})
  }

  handleEventClick = (e) => {
    e.preventDefault()
    e.nativeEvent.stopImmediatePropagation()
  }

  render () {
    const {content, classes, deleteBodyContent, hideBody, hideCategoryLabel} = this.props
    const {fullAuthorName, shortAuthorName, isEditing} = this.state
    return (
      <div onClick={ (e) => { this.offOnClickEvent(e)} }>
        <div className={ classes.root }>
          <CardHeader className={ classes.cardHeader }
                      avatar={ <Avatar aria-label="post"
                                       className={ classes.avatar }>
                        { shortAuthorName }
                      </Avatar> }
                      title={ fullAuthorName }
                      subheader={ this.state.date }

          >
          </CardHeader>
          { hideCategoryLabel ? null : <Button className={ classes.postLabel }>
            { content.category }
          </Button> }

          <PostSettingButton className={ classes.postMenu }
                             showPostEditView={ this.changeEditView }
                             content={ content }
                             deletePost={ deleteBodyContent }
          />
        </div>
        { !isEditing ? <CardContent>
            <Typography type="subheading" className={ classes.title }>
              { content.title }
            </Typography>
            { hideBody ? null : <div className={ classes.content }>
              <Typography type="body1" className={ classes.body }>
                { content.body }
              </Typography>
            </div>
            }
          </CardContent>
          : <CardContent>
            <PostSaveCancelButton
              cancelPost={ this.closePostEditView }
              savePost={ this.sendUpdatedPost }
            />
            <form noValidate autoComplete="off"
                  onClick={ (e) => {
                    this.offOnClickEvent(e)
                  } }>
              { content.title ? <Input
                placeholder="Write down your post title..."
                fullWidth="true"
                disableUnderline="true"
                onChange={ this.handleTitleChange }
                defaultValue={ content.title }
                className={ classes.textField }
                margin="normal"
              /> : null }
              { content.body ? <Input
                placeholder="What do you want to say..."
                multiline="true"
                fullWidth="true"
                disableUnderline="true"
                onChange={ this.handleBodyChange }
                defaultValue={ content.body }
                className={ classes.textField }
                margin="normal"
              /> : null }
            </form>
          </CardContent> }
      </div>

    )
  }
}

PostContent.propTypes = {
  classes: PropTypes.object.isRequired
}

export default styles(PostContent)
