import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { CardActions } from 'material-ui/Card'
import { styles } from '../styles/PostVote'

import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import ThumbUp from 'material-ui-icons/ThumbUp'
import ThumbDown from 'material-ui-icons/ThumbDown'
import classnames from 'classnames'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class PostVote extends React.Component {
  
  state = {
    upVote: false,
    downVote: false,
  }
  
  handleClickUpVote = (e, type) => {
    e.stopPropagation()
    
    this.setState({upVote: !this.state.upVote})
    if (this.state.downVote) {
      this.setState({downVote: false})
    }
    
  }
  
  handleClickDownVote = (e) => {
    e.stopPropagation()
    this.setState({downVote: !this.state.downVote})
    if (this.state.upVote) {
      this.setState({upVote: false})
      
    }
    
  }
  
  render () {
    const {content, classes} = this.props
    const {upVote, downVote} = this.state
    
    return (
      <CardActions disableActionSpacing className={classes.root}>
        <IconButton aria-label="Add to favorites"
                    onClick={this.handleClickUpVote}>
          <ThumbUp className={classnames(classes.button, {
            [classes.clicked]: upVote,
          })}/>
          
        </IconButton>
        <Typography className={classnames('', {
          [classes.clicked]: downVote || upVote,
        })}>
          {content.voteScore}
        </Typography>
        
        <IconButton aria-label="Add to favorites"
                    onClick={this.handleClickDownVote}>
          <ThumbDown className={classnames(classes.button, {
            [classes.clicked]: downVote,
          })}/>
        </IconButton>
        
        <div className={classes.flexGrow}/>
      
      </CardActions>
    )
  }
}

PostVote.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(PostVote))