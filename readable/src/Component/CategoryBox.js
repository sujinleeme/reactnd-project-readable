import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import { withRouter } from 'react-router-dom'

import * as categories from '../api-server/categories'
import {Link} from 'react-router-dom'

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

class CategoryBox extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      categories: [],
      active: ''
    }
  }
  
  componentWillMount () {
    this.setState({categories: categories.defaultData.categories})
  }
  
  componentWillReceiveProps(nextProps) {
    const locationChanged = nextProps.location !== this.props.location
    if (locationChanged) {
      if (nextProps.location.state){
        return this.changeCategory(nextProps.location.state.category)
      }
    }
  }
  
  
  componentDidMount(){
    let categoryName;
    if(this.props.location.search) {
      categoryName = this.props.location.search.match(/\w+/)[0]
      
      this.changeCategory(categoryName)
      return
    }
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
    const { match, location, history } = this.props
    
    return (
      categories &&
      <div className='category_grp'>
        {categories.map(({name, path}) => (
          <Button
            key={path}
            component={Link}
            to={{
              pathname:'/category',
              search: name,
              state: { category: name }
            }}
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

export default withRouter(withStyles(styles)(CategoryBox))