import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'

import * as categories from '../api-server/categories'

import { Link } from '../Utils/react-router-patch'
import { Urls } from '../Utils/urls'

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
}

function doSomething (event) {
  // eslint-disable-next-line no-console
  console.log(event.currentTarget.getAttribute('data-something'))
}

class CategoryBox extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      categories: [],
    }
  }
  
  componentWillMount () {
    this.setState({categories: categories.defaultData.categories})
  }
  
  componentDidMount(){
    const { categories } = this.state;
  }
  
  handleChange = (e, value) => {
    e.stopPropagation()
    let categoryName = e.target.innerHTML
    if (e.target.tagName !== 'SPAN'){
      categoryName = e.target.childNodes[0].innerHTML
    }
    this.changeCategory(categoryName)
  }
  
  changeCategory(name) {
    this.props.selectCategory(name)
    this.setState({ active: name })
  }
  
  render () {
    const { value } = this.state;
    const { categories } = this.state;
    const props = this.props
    console.log({value})
    return (
      categories &&
      <div className='category_grp'>
        {categories.map(({name, path}) => (
          <Button
            key={path}
            component={Link}
            path={`${Urls.category.path}`}
            params={{categoryName: name}}
            className={this.state.active === name ? 'active' : ''}
            classes={{
              root: props.classes.root,
              label: props.classes.label,
            }}
            onClick={this.handleChange}
          >{name}
          </Button>
        ))}
      </div>)
  }
}

CategoryBox.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CategoryBox)