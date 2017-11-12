import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { CardActions } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import ThumbUp from 'material-ui-icons/ThumbUp'
import ThumbDown from 'material-ui-icons/ThumbDown'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { styles } from '../../../styles/post/PostVote'

class UpDownVoter extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      upVote: false, downVote: false, voted: false,
      initVoteScore: this.props.content.voteScore,
    }
  }
  
  handleClickVote = (e, type) => {
    e.stopPropagation()
    const id = this.props.content.id
    const {upVote, downVote} = this.state
    //Change UI
    switch (type) {
      default:
      case 'upVote':
        this.setState({upVote: !upVote})
        if (downVote) {
          this.setState({downVote: false})
        }
        // Update Data
        this.updateUpDownVote(id, 'upVote')
        break
      case 'downVote':
        this.setState({downVote: !downVote})
        if (upVote) {
          this.setState({upVote: false})
        }
        // Update Data
        this.updateUpDownVote(id, 'downVote')
        break
    }
  }
  
  updateUpDownVote = (id, type) => {
    const {upVote, downVote} = this.state
    let notActived
    let opposite
    switch (type) {
      default:
      case 'downVote' :
        opposite = 'upVote'
        notActived = downVote
        break
      case 'upVote' :
        opposite = 'downVote'
        notActived = upVote
        break
    }
    if (!notActived) {
      if (this.state.voted) {
        // move to another thump button
        this.handleChange(id, type)
      }
      this.setState({voted: true})
      return this.handleChange(id, type)
    } else {
      this.setState({voted: false})
      return this.handleChange(id, opposite)
    }
  }
  
  handleChange = (id, type) => {
    this.props.updateVoteCounter(id, type)
  }
  
  render () {
    const {classes, content} = this.props
    const {upVote, downVote} = this.state
    return (
      <CardActions disableActionSpacing className={classes.root}>
        <IconButton aria-label="Add to favorites"
                    onClick={(e) => this.handleClickVote(e, 'upVote')}>
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
                    onClick={(e) => this.handleClickVote(e, 'downVote')}>
          <ThumbDown className={classnames(classes.button, {
            [classes.clicked]: downVote,
          })}/>
        </IconButton>
        <div className={classes.flexGrow}/>
      </CardActions>
    )
  }
}

const mapStateToProps = (globalState, ownProps) => {
  return {
    activePost: globalState.posts.activePost, id: ownProps.id,
  }
}

UpDownVoter.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps)(
  withRouter(withStyles(styles)(UpDownVoter)))