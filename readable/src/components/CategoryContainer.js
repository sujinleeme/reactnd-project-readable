import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'
import { Button } from 'material-ui'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import {
  selectCategory, categoryFetchData, tabFetchData,
} from '../modules/menu/actions'

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
  componentDidMount () {
    this.browserRefreshing()
  }
  
  componentWillReceiveProps (nextProps) {
    // console.log(nextProps.location)
  }
  
  init (nextProps) {

    let categoryName = nextProps.selectMenu.category

    // if (!categoryName && nextProps.categories.length) {
    //   return this.props.changeCategory({category: nextProps.categories[0].name})
    // }
    //
  }
  
  browserRefreshing() {
    let categoryName;
    const {changeCategory, changeTab, selectMenu, categories, location} = this.props
    
    
    // refreshing
    if (location.state) {
      categoryName = location.state.category
      const tabName = location.state.tab
      
    }
    // fetching written url
    else {
      categoryName = location.pathname.split('/')[2]
    }
    return changeCategory({category: categoryName})
  
  }
  
  
  handleChange = (e) => {
    e.stopPropagation()
    const {changeCategory, selectMenu, changeRoute} = this.props
    const tabName = selectMenu.tab
    let categoryName = e.target.innerHTML
    if (e.target.tagName !== 'SPAN') {
      categoryName = e.target.childNodes[0].innerHTML
    }
    changeCategory({category: categoryName})
    changeRoute(`/category/${categoryName}?=${tabName}`)
  }
  
  render () {
    const props = this.props
    const categoryItems = props.categories
    const currentTab = props.selectMenu.tab
    const currentCategory = props.selectMenu.category
    return (
      categoryItems &&
      <div className='category_grp'>
        {categoryItems.map(({name, path}) => (
          <Button
            key={path}
            component={Link}
            to={{
              pathname: `/category/${path}?=${currentTab}`,
              state: {category: name, tab: currentTab},
            }}
            className={currentCategory === name ? 'active' : ''}
            classes={{
              root: props.classes.root,
              label: props.classes.label,
            }}
            value={name}
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
    categories: state.categories,
    pathname: state.routerReducer.location.pathname
  
  
  
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeCategory: (data) => dispatch(selectCategory(data)),
    changeRoute: (url) => dispatch(push(url)),
    fetchCategoryList: () => dispatch(categoryFetchData()),
    fetchTabList: () => dispatch(tabFetchData()),
    
  
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(withStyles(styles)(CategoryContainer)))

