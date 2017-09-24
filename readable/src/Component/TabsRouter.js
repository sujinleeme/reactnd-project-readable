import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';
import { withRouter } from 'react-router';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom'

class TabsRouter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabSelected: 'one',
    };
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange = (tabSelected) => {
    this.setState({
      tabSelected: tabSelected,
    });
    this.props.history.push(tabSelected);
  };
  
  render() {
    
    return (
      <Tabs
        value={this.state.tabSelected}
        onChange={this.handleChange}
      >
        <Tab label="Item One" value="one">
          Tab Content 1
        </Tab>
        <Tab label="Item Two" value="two">
          Tab Content 2
        </Tab>
        <Tab label="Item Two" value="three">
          Tab Content 3
        </Tab>
      </Tabs>
    )
  };
  
  export default withRouter(TabsRouter);