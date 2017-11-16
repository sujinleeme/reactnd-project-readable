import React from 'react'
import {withStyles} from 'material-ui/styles'
import Button from 'material-ui/Button'
import {styles} from '../../../styles/post/PostSaveCancelButton'

const PostSaveCancelButton = (props) => {
  const {classes, cancelPost, savePost} = props
  return (
      <div className={ classes.root }>
        <Button color="accent" className={ classes.button }
                onClick={ cancelPost }>
          cancel
        </Button>
        <Button color="accent" className={ classes.button }
                onClick={ savePost }
        >
          save
        </Button>
      </div>
  )
}

export default withStyles(styles)(PostSaveCancelButton)