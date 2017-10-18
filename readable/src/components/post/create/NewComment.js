import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'

import { CardContent } from 'material-ui/Card'

import Avatar from 'material-ui/Avatar'
import Input from 'material-ui/Input'

import { styles } from '../../../styles/post/NewComment'

class NewComment extends React.Component {
  
  handleClick = (e) => {
    e.preventDefault()
  }
  
  render () {
    const {classes} = this.props
    
    return (
      <CardContent className={classes.root}>
        <Avatar className={classes.avatar}>GU</Avatar>
        <Input
          placeholder="Write a comment..."
          fullWidth="true"
          disableUnderline="true"
          inputProps={{
            'aria-label': 'Description',
          }}
          onChange={this.handleClick}
        />
      </CardContent>
    )
  }
}

export default withStyles(styles)(NewComment)