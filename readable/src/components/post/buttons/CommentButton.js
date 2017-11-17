import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import ModeCommentIcon from 'material-ui-icons/ModeComment'
import Typography from 'material-ui/Typography'
import { CardActions } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'

const styles = theme => (
  {
    root: {
      width: '10%'
    }
  }
)

const CommentButton = (props) => {
  const {classes, comment} = props
  return (
    <div>
      <CardActions disableActionSpacing className={ classes.root }>
        <IconButton>
          <ModeCommentIcon/>
        </IconButton>
        <Typography>
          { comment ? comment.length : 0 }
        </Typography>

      </CardActions>
    </div>
  )
}

CommentButton.propTypes = {
  classes: PropTypes.object.isRequired
}
export default withStyles(styles)(CommentButton)