import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

const NewPostButton = (props) => {
  const classes = props.classes;
  return (
    <div>
      <Button fab color="primary" aria-label="add" className={classes.button}>
        <AddIcon />
      </Button>
    </div>
  );
}

NewPostButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewPostButton);