import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { withStyles } from 'material-ui/styles'

import { CardContent } from 'material-ui/Card'
import { getComments } from '../modules/menu/actions/comments'
import { changeEditView } from '../modules/menu/actions/menu'
import Avatar from 'material-ui/Avatar'
import Input from 'material-ui/Input'

import { styles } from '../styles/PostCard'

class NewComment extends React.Component {
  
  render () {
    const {classes, content} = this.props
    
    return (
      
      <CardContent>
        
        <div className={classes.container}>
          <Avatar className="">GU</Avatar>
          <Input
            placeholder="Write a comment..."
            className={classes.input}
            inputProps={{
              'aria-label': 'Description',
            }}
          />
        </div>
      
      </CardContent>
    
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

NewComment.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(withStyles(styles)(NewComment)))