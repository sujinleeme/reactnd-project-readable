import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { CircularProgress } from 'material-ui/Progress'

const styles = theme => ({
  progress: {
    display: 'flex', justifyContent: 'center',
    alignItems: 'center',
  },
})

const CircularIndeterminate = (props) => {
  const {classes} = props
  return (
    <div className={classes.progress}>
      <CircularProgress  size={50}/>
    </div>
  )
}

CircularIndeterminate.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CircularIndeterminate)