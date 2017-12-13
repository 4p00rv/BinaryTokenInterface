import React from 'react';
import { observable, action } from 'mobx';
import { observer } from  'mobx-react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AddIcon from 'material-ui-icons/Add';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

import Session from '../../models/SessionStorage';

const styles = theme => ({
  tokenButton: {},
});

@observer
class AddTokenButton extends React.Component {
  @observable dialogOpen = false;
  @observable tokenAddress;
  @observable tokenFactoryAddress;

  getValues(key) {
    return Session.storage.get(key)
  }

  @action
  sessionHas = (key) => {
    return Session.storage.has(key);
  }

  @action
  formatAddress = (address) => {
    return address && address.length > 15
      ? `${address.slice(0,10)}...${address.slice(-5)}`
      : address;
  }

  @action
  handleClickOpen = () => {
    this.dialogOpen = true;
    this.tokenAddress = this.getValues('tokenAddress');
    this.tokenFactoryAddress = this.getValues('tokenFactoryAddress');
  }

  @action
  handleRequestClose = (e) => {
    this.dialogOpen = false;
    if (e.target.textContent === 'Okay') {
      Session.setItem({
        tokenAddress: this.tokenAddress,
        tokenFactoryAddress: this.tokenFactoryAddress
      });
    }
    if(e.target.textContent === 'Clear') {
      Session.removeSession();
    }
  }

  @action handleChange = (e) => {
    this[e.target.name] = e.target.value;
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Button className={ classes.tokenButton }
          type="button"
          color="contrast"
          onClick={this.handleClickOpen}
        >
          {this.formatAddress(this.getValues('tokenAddress')) || <AddIcon />}
        </Button>
        <Dialog open={this.dialogOpen} onRequestClose={this.handleRequestClose}>
          <DialogTitle>Token Address / Token Factory Address</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              value={this.tokenAddress}
              id="tokenAddress"
              label="Token Address"
              type="text"
              name="tokenAddress"
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              margin="dense"
              value={this.tokenFactoryAddress}
              id="tokenFactoryAddress"
              label="Token Factory Address"
              type="text"
              name="tokenFactoryAddress"
              onChange={this.handleChange}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRequestClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleRequestClose} color="primary">
              Clear
            </Button>
            <Button onClick={this.handleRequestClose} color="primary">
              Okay
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

AddTokenButton.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(AddTokenButton);
