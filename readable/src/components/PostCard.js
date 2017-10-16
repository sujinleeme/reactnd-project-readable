import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import classnames from 'classnames'
import Card, {
  CardHeader, CardContent, CardActions,
} from 'material-ui/Card'
import Collapse from 'material-ui/transitions/Collapse'
import Avatar from 'material-ui/Avatar'
import Button from 'material-ui/Button'

import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import ThumbUp from 'material-ui-icons/ThumbUp'
import ThumbDown from 'material-ui-icons/ThumbDown'

import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import Input from 'material-ui/Input'
import TextField from 'material-ui/TextField'

import Comments from './Comments'
import PostMenu from './PostMenu'

import { date, username } from '../utils/helper'

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
  
  header: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  cardHeader: {
    width: '100%',
  },
  postMenu: {
    alignItems: 'right',
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
  button: {
    margin: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
  },
})

class PostCard extends React.Component {
  
  state = {
    expanded: false,
    post: this.props.post,
    date: this.props.post.timestamp,
    like: false,
    fullAuthorName: this.props.post.author,
    shortAuthorName: '',
    isEditing: false,
  }
  
  componentDidMount = () => {
    const id = this.props.post.id
    this.setState({date: date(this.state.date)})
    this.props.fetchComments(id)
    this.setState({shortAuthorName: username(this.state.fullAuthorName)})
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
    const {post} = this.props
    const classes = this.props.classes
    const isLiked = this.state.like
    const {fullAuthorName, shortAuthorName, isEditing} = this.state
    const commentItems = this.props.comments
    
    return (
      <div className={classnames(classes.expand, {
        [classes.expandOpen]: this.state.expanded,
      })} onClick={this.handleExpandClick}
           aria-expanded={this.state.expanded}
           aria-label="Show more"
      >
        <Card className={classes.card}>
          
          
          <div className={classes.header}>
            <CardHeader className={classes.cardHeader}
                        avatar={
                          <Avatar aria-label="post" className={classes.avatar}>
                            {shortAuthorName}
                          </Avatar>
                        }
                        title={fullAuthorName}
                        subheader={this.state.date}
            
            
            />
            <PostMenu className={classes.postMenu}/>
          </div>
          
          {isEditing ? <CardContent>
              <Typography component="p">
                {post.title}
              </Typography>
              <Typography component="p">
                {post.body}
              </Typography>
            </CardContent>
            
            : <CardContent><Button color="accent" className={classes.button}>
              cancel
            </Button> <Button color="accent" className={classes.button}>
              save
            </Button>
              <form  noValidate autoComplete="off">
               
                <TextField
                  id="required"
                  label="Required"
                  defaultValue={post.title}
                  className={classes.textField}
                  margin="normal"
                />
                <TextField
                  required
                  id="required"
                  label="Required"
                  defaultValue={post.body}
                  className={classes.textField}
                  margin="normal"
                />
              </form>
            </CardContent>
            
          }
          
          
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
              {post.voteScore}
            </Typography>
            <IconButton aria-label="Add to favorites"
                        onClick={this.handleLikeClick}>
              {!isLiked ? <ThumbDown className={classes.favorite}/>
                : <ThumbDown className={classes.liked}/>
              }
            
            </IconButton>
            
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
                <Avatar className="">{shortAuthorName}</Avatar>
                <Input
                  placeholder="Write a comment..."
                  className={classes.input}
                  inputProps={{
                    'aria-label': 'Description',
                  }}
                />
              </div>
            
            </CardContent>
            <CardContent>
              
              {commentItems.map(comment => (
                <Comments
                  key={comment.id}
                  comment={comment}
                  {...this.props}/>
              ))}
            </CardContent>
          
          </Collapse>
        </Card>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    comments: state.comments,
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