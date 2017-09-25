// @flow weak

import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Input from 'material-ui/Input'
import Avatar from 'material-ui/Avatar'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  input: {
    margin: theme.spacing.unit,
  },
});

const CommentBox = (props) => {
  const classes = props.classes;
  return (
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
  );
}

CommentBox.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CommentBox);
