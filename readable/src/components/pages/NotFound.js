import React from 'react'
import {withStyles} from 'material-ui/styles'
import Typography from 'material-ui/Typography'

const styles = theme => (
    {
      root: {
        margin: theme.spacing.unit * 10,
        textAlign: 'center'
      }
    }
)

const NotFound = (props) => {
  const {classes} = props
  return (
      <div className={ classes.root }>
        <Typography type="display2" component="h1">
          404
          Not Found
        </Typography>
      </div>
  )

}

export default withStyles(styles)(NotFound)
