import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'

import * as categories from '../api-server/categories'

import { Link } from '../utils/react-router-patch'
import { Urls } from '../utils/urls'

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

class CategoryBox extends React.Component {
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
        {categories.map(({name, path}) => (
            <Button
              key={path}
              component={Link}
              path={`${Urls.category.path}`}
              params={{ categoryName: name }}
              classes={{
                root: props.classes.root,
                label: props.classes.label,
              }}>{name}
            </Button>
          ))}
      </div>)
  }
}

CategoryBox.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CategoryBox)