import React from 'react';
import { observable, action } from 'mobx';
import { observer } from  'mobx-react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AddIcon from 'material-ui-icons/Add';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

import CustomButton from '../elements/Buttons';
import Session from '../../models/SessionStorage';
import getContract from '../../utils/getContract';

const styles = theme => ({
  tokenButton: {},
});

@observer
class GenerateTokens extends React.Component {
  @observable dialogOpen = false;
  @observable loading = false;
  @observable tokenSupply;
  contract = getContract();

  getValues(key) {
    return Session.storage.get(key)
  }

  @action
  handleClickOpen = () => {
    this.dialogOpen = true;
    this.contract.totalSupply((err, res) => {
      if(res) {
        this.tokenSupply = res.toNumber();
      }
    });
  }

  @action
  handleRequestClose = (e) => {
    if (e.target.textContent === 'Generate') {
      this.loading = true;
      this.contract.generateTokens(this.tokenSupply, (err, res) => {
        this.loading = false;
        if(res) {
          this.dialogOpen = false;
        } else {
          console.log(err.message);
        }
      });
    } else {
      this.dialogOpen = false;
    }
  }

  @action handleChange = (e) => {
    this[e.target.name] = e.target.value;
  }

  render() {
    const { classes } = this.props;
    window.contract = this.contract;
    return (
      <div>
        <CustomButton
          classes={{button: 'floatRight'}}
          type="button"
          onClick={this.handleClickOpen}
          content='Generate Tokens'
        />
        <Dialog open={this.dialogOpen} onRequestClose={this.handleRequestClose}>
          <DialogTitle>Generate Tokens</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              value={this.tokenSupply}
              label="Token supply"
              type="number"
              name="tokenSupply"
              onChange={this.handleChange}
              style={{width: 250}}
              required
            />
          </DialogContent>
          <DialogActions>
            {!this.loading && <Button onClick={this.handleRequestClose} color="primary">
              Cancel
            </Button>}
            <Button onClick={this.handleRequestClose} color="primary">
              {this.loading ? <CircularProgress color="accent" size={24}/> : 'Generate'}
            </Button>

          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

GenerateTokens.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(GenerateTokens);
