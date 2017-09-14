import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
// import Link from 'docs/src/modules/components/Link';

const styles = theme => ({
	button: {
		margin: theme.spacing.unit,
	},
});

function doSomething(event) {
	// eslint-disable-next-line no-console
	console.log(event.currentTarget.getAttribute('data-something'));
}

function Category(props) {
	const classes = props.classes;
	return (
		<div>
			<Button raised className={classes.button}>
				Default
			</Button>
		</div>
	);
}

Category.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Category)