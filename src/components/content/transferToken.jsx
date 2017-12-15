import React from 'react';
import PropTypes from 'prop-types';
import { observable, action } from "mobx";
import { observer } from 'mobx-react';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Subheader from 'material-ui/List/ListSubheader';
import TextField from 'material-ui/TextField';

import CustomButton from '../elements/Buttons';
import commonStyles from '../styles/commonStyle';

const styles = theme => ({
  container: commonStyles(theme).container,
  textField: commonStyles(theme).textField,
  form: {
    width: '100%',
    minHeight: 300,
  },
});

@observer
class TransferToken extends React.Component {
  @observable fromAddress;
  @observable toAddress;
  @observable amount;

  constructor(...args) {
    super(...args);
    this.fromAddress = web3 ? web3.eth.defaultAccount : '';
  }

  @action
  handleFormSubmit = e => {
    e.preventDefault();
  }

  isValidAddress( address ) {
    if (web3 && address) {
      return web3.isAddress(address);
    }

    return true;
  }

  @action
  handleChange = e => {
    this[e.target.name] = e.target.value;
  }

  render () {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <form onSubmit={this.handleFormSubmit} className={classes.form}>
          <Grid container spacing={16}>
            <Grid item key="Subheader" xs={12}>
              <Subheader component="div">Transfer Token</Subheader>
            </Grid>
            <Grid item xs={12}>
              <TextField
                disabled
                name="fromAddress"
                label="From"
                value={this.fromAddress}
                className={classes.textField}
                margin="normal"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="toAddress"
                label="To"
                onChange={this.handleChange}
                value={this.toAddress}
                error={!this.isValidAddress(this.toAddress)}
                className={classes.textField}
                margin="normal"
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="amount"
                label="Amount"
                value={this.amount}
                type="number"
                className={classes.textField}
                margin="normal"
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <CustomButton raised={true} type="submit" content="Transfer" disabled={this.loading}/>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

TransferToken.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TransferToken);
