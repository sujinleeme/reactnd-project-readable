/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import classnames from 'classnames'
import Card, {
  CardHeader, CardContent, CardActions,
} from 'material-ui/Card'
import Collapse from 'material-ui/transitions/Collapse'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import ExpandLessIcon from 'material-ui-icons/ExpandLess'
import ShareIcon from 'material-ui-icons/Share'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import FavoriteIcon from 'material-ui-icons/Favorite'
import FavoriteBorderIcon from 'material-ui-icons/FavoriteBorder'
import Input from 'material-ui/Input'

import Comments from './Comments'
import { date } from '../utils/helper'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { getComments } from '../modules/menu/actions/comments'



const styles = theme => ({
  root: {},
  
  card: {
    maxWidth: '100%',
    '&:hover': {
      background: '#f9f9f9',
      transition: '.5s all',
      cursor: 'pointer',
    },
  },
  media: {
    height: '80px',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(0deg)',
  },
  
  avatar: {
    backgroundColor: theme.palette.secondary,
  },
  flexGrow: {
    flex: '1 1 auto',
  },
  
  favorite: {
    '&:hover': {
      color: 'red',
    },
    
  },
  liked: {
    color: 'red',
  },
  container: {
    display: 'flex',
    width: '100%',
  },
  input: {
    margin: theme.spacing.unit,
    width: '100%',
  },
})

class PostCard extends React.Component {
  
  state = {
    expanded: false,
    post: this.props.post,
    date: this.props.post.timestamp,
    like: false
  }
  

  componentDidMount = () => {
    const convertedTime = date(this.state.date)
    const id = this.props.post.id
    console.log(id)
    this.setState({date: convertedTime})
    
    this.props.fetchComments(id)
  }
  
  handleExpandClick = (e) => {
    e.stopPropagation()
    
    this.setState({expanded: !this.state.expanded})
  }
  
  
  handleLikeClick = (e) => {
    e.stopPropagation()
    this.setState({like: !this.state.like})
  }
  
  render () {
    const {classes, post} = this.props
    const isLiked = this.state.like
    return (
      <div className={classnames(classes.expand, {
        [classes.expandOpen]: this.state.expanded,
      })} onClick={this.handleExpandClick}
           aria-expanded={this.state.expanded}
           aria-label="Show more"
      >
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar aria-label="Recipe" className={classes.avatar}>
                R
              </Avatar>
            }
            title={post.title}
            subheader={this.state.date}
          />
          <CardContent>
            <Typography component="p">
              {post.body}
            </Typography>
          </CardContent>
          
          <CardActions disableActionSpacing>
            <IconButton aria-label="Add to favorites"
                        onClick={this.handleLikeClick}>
              {!isLiked ? <FavoriteBorderIcon className={classes.favorite}/>
                : <FavoriteIcon className={classes.liked}/>
              }
            </IconButton>
            
            <Typography className={
              !isLiked ? '' : classes.liked}
            >
              {post.voteScore}
            </Typography>
            
            
            <div className={classes.flexGrow}/>
            <IconButton>
              <ExpandMoreIcon/>
            </IconButton>
          </CardActions>
          <Collapse in={this.state.expanded} transitionDuration="auto"
                    unmountOnExit
          >
            <CardContent>
              <div className={classes.container}>
                <Avatar className="">OP</Avatar>
                <Input
                  placeholder="Write a comment..."
                  className={classes.input}
                  inputProps={{
                    'aria-label': 'Description',
                  }}
                />
              </div>
              <Comments/>
            </CardContent>
          </Collapse>
        </Card>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchComments: (id) => dispatch(getComments(id)),
  }
}

PostCard.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(withStyles(styles)(PostCard)))