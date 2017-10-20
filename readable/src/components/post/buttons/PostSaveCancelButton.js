import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'


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


export default
  withStyles(styles)(PostSaveCancelButton)