import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getComments } from '../modules/menu/actions/comments'
import { date, username } from '../utils/helper'

import Card, {
  CardHeader, CardContent, CardActions,
} from 'material-ui/Card'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import ThumbUp from 'material-ui-icons/ThumbUp'
import ThumbDown from 'material-ui-icons/ThumbDown'

const styles = theme => ({
  root: {},
  
  container: {
    display: 'flex',
    width: '100%',
  },
  input: {
    margin: theme.spacing.unit,
    width: '100%',
  },
  avatar: {
    backgroundColor: theme.palette.secondary,
  },
})

class Comments extends React.Component {
  
  state = {
    author: this.props.comment.author,
    fullAuthorName: this.props.comment.author,
    shortAuthorName: '',
    like: false,
    date: this.props.comment.timestamp,
  }
  
  componentDidMount () {
    this.setState({author: username(this.state.author)})
    this.setState({shortAuthorName: username(this.state.fullAuthorName)})
    this.setState({date: date(this.state.date)})
  }
  
  render () {
    const {classes, comment} = this.props
    const {fullAuthorName, shortAuthorName} = this.state
    const isLiked = this.state.like
    return (
      <div className={classes.root}>
        
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar aria-label="post" className={classes.avatar}>
                {shortAuthorName}
              </Avatar>
            }
            title={fullAuthorName}
            subheader={this.state.date}
          />
          <CardContent>
            <Typography component="p">
              {comment.body}
            </Typography>
          </CardContent>
          
          <CardActions disableActionSpacing>
            <IconButton aria-label="Add to favorites"
                        onClick={this.handleLikeClick}>
              {!isLiked ? <ThumbUp className={classes.favorite}/>
                : <ThumbUp className={classes.liked}/>
              }
            
            </IconButton>
            
            
            <Typography className={
              !isLiked ? '' : classes.liked}
            >
              {comment.voteScore}
            </Typography>
            <IconButton aria-label="Add to favorites"
                        onClick={this.handleLikeClick}>
              {!isLiked ? <ThumbDown className={classes.favorite}/>
                : <ThumbDown className={classes.liked}/>
              }
            
            </IconButton>
          </CardActions>
        </Card>
      
      
      </div>
    
    )
    
  }
  
}

Comments.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  return {
    selectMenu: {
      category: state.currentMenu.category,
      tab: state.currentMenu.tab,
    },
    categories: state.categories,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchComments: (id) => dispatch(getComments(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(withStyles(styles)(Comments)))
