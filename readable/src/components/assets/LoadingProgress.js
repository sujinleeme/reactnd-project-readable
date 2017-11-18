import React from 'react'
import PropTypes from 'prop-types'
import { CircularProgress } from 'material-ui/Progress'
import { styles } from '../../styles/assets/LoadingProgress'

const CircularIndeterminate = (props) => {
  const {classes} = props
  return (
    <div className={ classes.progress }>
      <CircularProgress size={ 50 }/>
    </div>
  )
}

CircularIndeterminate.propTypes = {
  classes: PropTypes.object.isRequired
}

export default styles(CircularIndeterminate)