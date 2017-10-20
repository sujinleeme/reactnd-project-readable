import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'

import Avatar from 'material-ui/Avatar'
import Input from 'material-ui/Input'
import Card, { CardActions, CardContent } from 'material-ui/Card'

import { styles } from '../../../styles/post/NewPost'

class NewPost extends React.Component {
  
  handleClick = (e) => {
    e.preventDefault()
  }
  
  render () {
    const {classes} = this.props
    
    return (
      <Card className={classes.root}>
        <CardContent className={classes.content}>
          <Avatar className={classes.avatar}>GU</Avatar>
          <form noValidate autoComplete="off" className={classes.form}>
            <Input
              placeholder="Title"
              fullWidth="true"
              disableUnderline="true"
              inputProps={{
                'aria-label': 'title',
              }}
              onChange={this.handleClick}
            />
            <Input
              placeholder="Body"
              fullWidth="true"
              disableUnderline="true"
              inputProps={{
                'aria-label': 'body',
              }}
              multiline="true"
              onChange={this.handleClick}
            />
          </form>
        </CardContent>
      </Card>
    )
  }
}

export default withStyles(styles)(NewPost)