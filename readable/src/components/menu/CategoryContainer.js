import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'material-ui'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { styles } from '../../styles/menu/CategoryContainer'

const CategoryContainer = (props) => {
  const {classes, categories, currentCategory, currentTab} = props
  return (
    categories && <div className='category_grp'>
      { categories.map(({name, path}) => (
        <Button
          key={ path }
          component={ Link }
          to={ {
            pathname: `/category/${path}`,
            state: {category: name, tab: currentTab}
          } }
          className={ currentCategory === name ? classes.active : '' }
          classes={ {
            root: classes.root, label: classes.label
          } }
          value={ name }
        >{ name }
        </Button>
      )) }
    </div>)
}

CategoryContainer.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    currentCategory: state.currentMenu.category,
    currentTab: state.currentMenu.tab,
    categories: state.categories
  }
}

export default connect(mapStateToProps)(styles(CategoryContainer))
