import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styles = theme => {
  return ({
    root: {
      marginRight: '8px',
      marginTop: '8px',
      backgroundColor: theme.palette.background.A300,
      fontWeight: 'bolder',
    },
    label: {
      textTransform: 'capitalize',
    },
  })
};

function doSomething(event) {
	// eslint-disable-next-line no-console
	console.log(event.currentTarget.getAttribute('data-something'));
}

function Category(props) {
  const classes = props.classes;
  return (
    <div className='category_grp'>
      <Button raised
              classes={{
                root: props.classes.root, // className, e.g. `OverridesClasses-root-X`
                label: props.classes.label, // className, e.g. `OverridesClasses-label-X`
              }}
      >
				Default
      </Button>
      <Button raised
              classes={{
                root: props.classes.root, // className, e.g. `OverridesClasses-root-X`
                label: props.classes.label, // className, e.g. `OverridesClasses-label-X`
              }}
      >TT</Button>
    </div>
	);
}

Category.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Category)