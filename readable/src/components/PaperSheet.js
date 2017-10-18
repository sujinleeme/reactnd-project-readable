import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  root: theme.mixins.gutters({
    background: 'none',
    boxShadow: 'none'
  }),
});

const PaperSheet = (props) => {
  const classes = props.classes;
  return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography type="headline" component="h3">
          This is a sheet of paper.
        </Typography>
        <Typography type="body1" component="p">
          Sujin Lee
        </Typography>
      </Paper>
    </div>
  );
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaperSheet);