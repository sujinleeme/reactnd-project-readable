import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Card, { CardActions, CardContent } from 'material-ui/Card';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

class CreatePost extends React.Component {
  state = {
    name: '',
    age: '',
    multiline: 'Controlled',
  };
  
  handleChangeMultiline = event => {
    this.setState({
      multiline: event.target.value,
    });
  };
  
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  
  render() {
    const { classes } = this.props;
    
    return (
      <Card className={classes.card}>
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          label="Title"
          placeholder="Title"
          multiline
          className={classes.textField}
          value={this.state.name}
          onChange={this.handleChange('name')}
          margin="normal"
        />
      </form>
      </Card>
    );
  }
}

CreatePost.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreatePost);

