import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import Grid from 'material-ui/Grid'
import { styles } from '../../styles/page/MainRouterSettingLayoutPage'
import CategoryPostsPage from '../pages/CategoryPostsPage'
import NotFound from '../pages/NotFound'
import PostDetailPage from '../pages/PostDetailPage'
import AllPostsPage from '../pages/AllPostsPage'
import CopyrightBar from '../footer/CopyrightBar'
import HeaderBar from '../header/HeaderBar'
import * as actions from '../../modules/actions/menu'

class MainRouterSettingLayoutPage extends React.Component {
  componentWillMount () {
    this.props.getCategories()
    this.props.getTabs()
  }

  render () {
    const {classes} = this.props
    return (
      <div>
        <HeaderBar/>
        <div className={ classes.root }>
          <Grid container spacing={ 0 }>
            <Grid item md={ 3 }/>
            <Grid item md={ 6 } container={ true } direction="column">
              <Switch>
                <Route exact path='/' component={ AllPostsPage }/>
                <Route exact path='/category/:category/'
                       component={ CategoryPostsPage }
                />
                <Route exact path='/posts/:id'
                       component={ PostDetailPage }/>
                <Route path='*'
                       component={ NotFound }
                />
              </Switch>
            </Grid>
            <Grid item md={ 3 }>
            </Grid>
          </Grid>
        </div>
        <CopyrightBar/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    postList: state.posts.postList,
    currentCategory: state.currentMenu.category,
    currentTab: state.currentMenu.tab
  }
}

export default connect(mapStateToProps, actions)(withRouter(
  styles(MainRouterSettingLayoutPage)))