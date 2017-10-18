import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'

import { getComments } from '../../../modules/actions/comments'
import { changeEditView } from '../../../modules/actions/menu'

import { styles } from '../../../styles/post/PostSaveCancelButton'

class PostSaveCancelButton extends React.Component {
  
  render () {
    const {classes} = this.props
    return (
      <div className={classes.root}>
        <Button color="accent" className={classes.button}
                onClick={this.props.cancelPost}>
          cancel
        </Button>
        <Button color="accent" className={classes.button}
                onClick={this.props.savePost}
        >
          save
        </Button>
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

PostSaveCancelButton.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(PostSaveCancelButton))