/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classnames from 'classnames';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import ExpandLessIcon from 'material-ui-icons/ExpandLess';
import ShareIcon from 'material-ui-icons/Share';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import { red, lightBlue } from 'material-ui/colors';
import CommentBox from './CommentBox'

const styles = theme => ({
  card: {
    maxWidth: '100%',
    '&:hover': {
      background: '#f9f9f9',
      transition: '.5s all',
      cursor: 'pointer'
}
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
  
  hover: {
    background: 'red'
  },
  
  avatar: {
    backgroundColor: theme.palette.secondary
  },
  flexGrow: {
    flex: '1 1 auto',
  },
});

class PostList extends React.Component {
  state = {
    expanded: false
  };
  
  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };
  
  render() {
    const classes = this.props.classes;
    
    return (
      <div className={classnames(classes.expand, {
        [classes.expandOpen]: this.state.expanded
      }, "card")} onClick={this.handleExpandClick}
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
            title="Shrimp and Chorizo Paella"
            subheader="September 14, 2016"
          />
          <CardMedia
            className={classes.media}
            image="/static/images/cards/paella.jpg"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography component="p">
              This impressive paella is a perfect party dish and a fun meal to cook together with
              your guests. Add 1 cup of frozen peas along with the mussels, if you like.
            </Typography>
          </CardContent>
          <CardActions disableActionSpacing>
            <IconButton aria-label="Add to favorites">
              <ExpandLessIcon />
            </IconButton>
            <IconButton aria-label="Add to favorites">
              <ExpandMoreIcon />
            </IconButton>
            <IconButton aria-label="Share">
              <ShareIcon />
            </IconButton>
            <div className={classes.flexGrow} />
            <IconButton
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={this.state.expanded} transitionDuration="auto" unmountOnExit>
            <CardContent>
              <CommentBox />
            </CardContent>
          </Collapse>
        </Card>
      </div>
    );
  }
}

PostList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PostList);
