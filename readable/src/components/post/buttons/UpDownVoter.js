import React from 'react'
import PropTypes from 'prop-types'
import { CardActions } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import ThumbUp from 'material-ui-icons/ThumbUp'
import ThumbDown from 'material-ui-icons/ThumbDown'
import classnames from 'classnames'
import { styles } from '../../../styles/buttons/UpDownVoter'

class UpDownVoter extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      upVote: false,
      downVote: false,
      voted: false,
      initVoteScore: this.props.content.voteScore,
      parentId: this.props.content.parentId
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
    const {upVote, downVote, parentId} = this.state
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
        this.props.updateVoteCounter(id, type, parentId)
      }
      this.setState({voted: true})
      return this.props.updateVoteCounter(id, type, parentId)
    }
    else {
      this.setState({voted: false})
      return this.props.updateVoteCounter(id, opposite, parentId)
    }
  }

  render () {
    const {classes, content} = this.props
    const {upVote, downVote} = this.state
    return (
      <CardActions disableActionSpacing className={ classes.root }>
        <IconButton aria-label="Add to favorites"
                    onClick={ (e) => this.handleClickVote(e, 'upVote') }
        >
          <ThumbUp className={ classnames(classes.button, {
            [classes.clicked]: upVote
          }) }/>
        </IconButton>
        <Typography className={ classnames('', {
          [classes.clicked]: downVote || upVote
        }) }>
          { content.voteScore }
        </Typography>
        <IconButton aria-label="Add to favorites"
                    onClick={ (e) => this.handleClickVote(e, 'downVote') }>
          <ThumbDown className={ classnames(classes.button, {
            [classes.clicked]: downVote
          }) }/>
        </IconButton>
      </CardActions>
    )
  }
}

UpDownVoter.propTypes = {
  classes: PropTypes.object.isRequired
}

export default styles(UpDownVoter)