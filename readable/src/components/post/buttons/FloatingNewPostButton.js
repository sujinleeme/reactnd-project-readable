import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'

const styles = theme => (
    {
      root: {
        alignItems: 'flex-end'

      },
      button: {
        position: 'absolute', bottom: '30px'
      }
    }
)

const FloatingNewPostButton = (props) => {
  const classes = props.classes
  return (
      <div className={ classes.root }>
        <Button fab color="primary" aria-label="add"
                className={ classes.button }>
          <AddIcon/>
        </Button>
      </div>
  )
}

FloatingNewPostButton.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(FloatingNewPostButton)