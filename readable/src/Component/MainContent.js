import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Grid from 'material-ui/Grid'
import PostList from './PostList'
import PaperSheet from './PaperSheet'
import CreatePost from './CreatePost'
import {Link} from 'react-router-dom';

function TabContainer(props) {
  return <div>{props.children}</div>;
}

TabContainer.propTypes = {
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
  state = {
    value: 0,
  };
  
  handleChange = (event, value) => {
    this.setState({ value });
  };
  
  render() {
    const { classes } = this.props;
    const { value } = this.state;
  
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item md={2}/>
          <Grid item md={6} container={true} direction="column">
        <AppBar position="static"  color="inherit">
          <Link to={{ pathname: '/roster/7' }}><Tabs value={value} onChange={this.handleChange}>
            <Tab value={0} label="home" />
            <Tab value={1} label="about"/>
            <Tab value={2} label="contact"/>
            <Tab value={3} label="faq"/>
          </Tabs>
          </Link>
        </AppBar>
        {value === 0 && <TabContainer>
          <CreatePost />
          <PostList/>
          <PostList/>
          
        </TabContainer>}
        {value === 1 && <TabContainer><PostList/></TabContainer>}
        {value === 2 && <TabContainer><PostList/></TabContainer>}
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

export default withStyles(styles)(MainContent);