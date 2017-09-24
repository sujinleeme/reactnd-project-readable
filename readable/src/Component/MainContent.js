import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Grid from 'material-ui/Grid'
import PostList from './PostList'
import PaperSheet from './PaperSheet'
import CreatePost from './CreatePost'
import { withRouter } from "react-router-dom";



import { Link } from '../utils/react-router-patch'
import { Urls } from '../utils/urls'

function PostContainer(props) {
  return <div>{props.children}</div>;
}

PostContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    paddingTop: theme.spacing.unit * 3,
    backgroundColor: theme.palette.background.A300,
    width: '100vw'
  },
});

class MainContent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 0
    }
  }
  
  // handleChange = (event, value) => {
  //   this.setState({ value });
  // };
  handleCallToRouter = (value) => {
    console.log(this.props.history.location.pathname)
    this.props.history.push(value);
  }
  
  render() {
    const { classes, location } = this.props;
    const { value } = this.state;
    console.log(this.props.history.location.pathname);
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item md={2}/>
          <Grid item md={6} container={true} direction="column">
        <AppBar position="static"  color="inherit">
          <Tabs
            value={this.props.history.location.pathname}
            onChange={this.handleCallToRouter}
          >
            <Tab
              label="Home"
              value="/"
              component={Link}
              path={`${Urls.filter.path}`}
              params={{ type: 'new' }}
            >
              <div>
              </div>
            </Tab>
            <Tab
              label="Portfolio"
              value="/portfolio"
            >
              <div>
              </div>
            </Tab>
          </Tabs>
  
          {/*<Tabs value={location} onChange={this.handleChange}>*/}
            {/*<Tab value={0} label="home" containerElement={<Link to="/my-firs-tab-view" />} />*/}
            {/*<Tab value={1} label="about"/>*/}
            {/*<Tab value={2} label="contact"/>*/}
          {/*</Tabs>*/}
        </AppBar>
        {/*{value === 0 && <PostContainer>*/}
          {/*<CreatePost />*/}
          {/*<PostList/>*/}
          {/*<PostList/>*/}
          {/**/}
        {/*</PostContainer>}*/}
        {/*{value === 1 && <PostContainer><PostList/></PostContainer>}*/}
        {/*{value === 2 && <PostContainer><PostList/></PostContainer>}*/}
          </Grid>
          <Grid item md={2}>
            <PaperSheet />
          </Grid>
          <Grid item md={2}/>
        </Grid>
      </div>
    );
  }
}

MainContent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(MainContent));