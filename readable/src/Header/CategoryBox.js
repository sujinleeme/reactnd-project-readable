import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import { Link } from 'react-router-dom'

import * as categories from '../api-server/categories'


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

class Category extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: []
    }
  }
  
  componentWillMount() {
    this.setState({categories: categories.defaultData.categories})
  }
  
  render() {
    const props = this.props
    const categories = this.state.categories
    return (
      categories &&
      <div className='category_grp'>
        {categories.map((category, i) => (
          <Link key={category.name} to={`/${category.path}`}>
            <Button raised
                    classes={{
                      root: props.classes.root,
                      label: props.classes.label,
                    }}>{category.name}
            </Button>
          </Link>
          ))}
      </div>)
  }
}

Category.propTypes = {
	classes: PropTypes.object.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.bool.isRequired
    }).isRequired
  ).isRequired
};

export default withStyles(styles)(Category)