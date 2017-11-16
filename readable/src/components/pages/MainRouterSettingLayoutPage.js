import React from 'react'
import {withRouter, Route, Switch} from 'react-router-dom'
import {withStyles} from 'material-ui/styles'
import CategoryPostsPage from '../pages/CategoryPostsPage'
import NotFound from '../pages/NotFound'
import PostDetailPage from '../pages/PostDetailPage'
import AllPostsPage from '../pages/AllPostsPage'
import CopyrightBar from '../footer/CopyrightBar'
import HeaderBar from '../header/HeaderBar'
import Grid from 'material-ui/Grid'
import {connect} from 'react-redux'
import {getCategories, getTabs} from '../../modules/actions/menu'

const styles = theme => (
    {
      root: {
        flexGrow: 1, paddingTop: theme.spacing.unit * 3,
        backgroundColor: theme.palette.background.A300, boxShadow: 'none',
        minHeight: '100vh', paddingBottom: theme.spacing.unit * 3, margin: 0
      }
    }
)

class MainRouterSettingLayoutPage extends React.Component {
  componentWillMount() {
    this.props.fetchCategories()
    this.props.fetchTabs()
  }

  render() {
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

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCategories: () => new Promise((res) => dispatch(getCategories())),
    fetchTabs: () => new Promise((res) => dispatch(getTabs()))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(
    withStyles(styles)(MainRouterSettingLayoutPage)))