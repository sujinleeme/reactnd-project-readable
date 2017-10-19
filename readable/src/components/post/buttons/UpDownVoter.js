import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { CardActions } from 'material-ui/Card'
import { styles } from '../../../styles/post/PostVote'

import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import ThumbUp from 'material-ui-icons/ThumbUp'
import ThumbDown from 'material-ui-icons/ThumbDown'
import classnames from 'classnames'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { updateVote, getPost } from '../../../modules/actions/posts'

class UpDownVoter extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

      upVote: false,
      downVote: false,
      
    }
  }
  
  handleClickUpVote = (e, type) => {
    const id = this.props.content.id
    e.stopPropagation()
    this.setState({upVote: !this.state.upVote})

    if (this.state.downVote) {
      this.setState({downVote: false})
    }
    if (this.state.upVote) {
      this.props.updatePostVote(id, 'downVote')
      this.props.fetchPost(id)
  
  
    }
    if (!this.state.upVote) {
      this.props.updatePostVote(id, 'upVote')
      this.props.fetchPost(id)
  
    }
    console.log(this.props.VoteIsUpdated)

  }
  handleClickDownVote = (e) => {
    const id = this.props.content.id
    e.stopPropagation()

    this.setState({downVote: !this.state.downVote})
    if (this.state.upVote) {
      this.setState({upVote: false})
    }

    if (this.state.downVote) {
      this.props.updatePostVote(id, 'upVote')
    }
    if (!this.state.downVote) {
      this.props.updatePostVote(id, 'downVote')
    }
    
  }
  
  render () {
    const {classes, content} = this.props
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

const mapStateToProps = (state) => {
  return {
    VoteIsUpdated: state.voteUpdateSuccess,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updatePostVote: (id, option) => dispatch(updateVote(id, option)),
    fetchPost: (id) => dispatch(getPost(id)),
  }
}

UpDownVoter.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(withStyles(styles)(UpDownVoter)))