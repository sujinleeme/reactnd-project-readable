import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Category from './Category'

const styles = theme => ({
	root: {
		width: '100%',
		background: '#fff',
	},
})

function HeaderBar(props) {
	const classes = props.classes
	return (
		<div className={classes.root}>
			<AppBar position="static" color="inherit">
				<Toolbar>
					<Typography type="title" color="inherit">
						ShowUP / Udacity Nanodegree Student's Projects
					</Typography>
					<Category/>
				</Toolbar>
			</AppBar>

		</div>
)
}

HeaderBar.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(HeaderBar)
