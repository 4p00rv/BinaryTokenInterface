import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit*2,
    '&.floatRight': {
      float: 'right',
      marginRight: 20,
    },
  },
  input: {
    display: 'none',
  },
});

function RaisedButtons(props) {
  const { classes } = props;
  return (
      <Button raised type={props.type} color="primary" className={classes.button}>
        Add
      </Button>
  );
}

RaisedButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RaisedButtons);