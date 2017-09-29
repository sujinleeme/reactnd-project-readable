import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { Link } from 'react-router-dom'
import { selectCategory, selectTab } from '../modules/actions'
import * as categories from '../api-server/categories'

// import { store } from '../index.js'

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

class CategoryContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      categories: [],
    }
    
  }
  
  componentWillMount () {
    this.setState({categories: categories.defaultData.categories})
  }
  
  handleChange = (e, value) => {
    e.stopPropagation()
    const {changeCategory, changeRoute} = this.props
    let categoryName = e.target.innerHTML
    if (e.target.tagName !== 'SPAN') {
      categoryName = e.target.childNodes[0].innerHTML
      
    }
    changeCategory({category: categoryName})
    changeRoute(`/category/${categoryName}`)
  }
  
  render () {
    const {categories} = this.state
    const props = this.props
    const currentCategory = props.selectMenu.category
    const currentTab = props.selectMenu.tab
    
    return (
      categories &&
      <div className='category_grp'>
        {categories.map(({name, path}) => (
          <Button
            key={path}
            component={Link}
            to={{
              pathname: `/category/${name}?=${currentTab}`,
              state: {category: name, tab: currentTab},
            }}
            className={currentCategory === name ? 'active' : ''}
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

CategoryContainer.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  
  return {
    selectMenu: {
      category: state.currentMenu.category,
      tab: state.currentMenu.tab,
    },
    
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeCategory: (data) => dispatch(selectCategory(data)),
    changeTab: (data) => dispatch(selectTab(data)),
    changeRoute: (url) => dispatch(push(url)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(withStyles(styles)(CategoryContainer)))

