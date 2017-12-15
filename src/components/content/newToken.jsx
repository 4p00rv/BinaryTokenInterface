import React from 'react';
import PropTypes from 'prop-types';
import { observable, action } from "mobx";
import { observer } from 'mobx-react';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Subheader from 'material-ui/List/ListSubheader';
import TextField from 'material-ui/TextField';
import CustomButton from '../elements/Buttons';
import Typography from 'material-ui/Typography';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Input, { InputLabel } from 'material-ui/Input';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import { CircularProgress } from 'material-ui/Progress';

import DeployContract from '../../utils/DeployContract';
import Session from '../../models/SessionStorage';
import commonStyles from '../styles/commonStyle';
import GenerateTokens from './generateTokens';

const styles = theme => ({
    ...commonStyles(theme),
    tokenAddress: {
      textAlign: 'center',
      padding: '10 20 15 20',
      maxHeight: 70,
    },
    typography: {
      marginBottom: 10,
      fontSize: theme.typography.fontSize,
    },
    inputLabel: {
      ...theme.typography.caption
    },
});

@observer
class NewToken extends React.Component {
  @observable tokenName;
  @observable transfersEnabled = true;
  @observable decimalUnits = 18;
  @observable tokenSymbol;
  @observable loading = false;

  getAddress() {
    const tokenAddress = Session.storage.get('tokenAddress');
    const tokenFactoryAddress = Session.storage.get('tokenFactoryAddress');
    if(tokenAddress) return [tokenAddress, tokenFactoryAddress];

    return false;
  }

  render () {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <form onSubmit={this.handleFormSubmit} style={{minHeight: 300}}>
          <Grid container spacing={24} >
            <Grid item key="Subheader" xs={6} sm={6}>
              <Subheader component="div">New Token</Subheader>
            </Grid>
            <Grid item xs={6} sm={6}>
              {this.getAddress() && <GenerateTokens />}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="name"
                label="Token name"
                name="tokenName"
                onChange={this.handleChange}
                className={classes.textField}
                margin="normal"
                required={true}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="decimalUnits"
                label="Decimal units"
                name="decimalUnits"
                value={this.decimalUnits}
                onChange={this.handleChange}
                className={classes.textField}
                margin="normal"
                type="number"
                required={true}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="symbol"
                label="Token symbol"
                name="tokenSymbol"
                onChange={this.handleChange}
                className={classes.textField}
                margin="normal"
                required={true}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <div className={classes.inputSelect}>
                <InputLabel className={classes.inputLabel} htmlFor="transfersEnabled" required>Tranfers enabled</InputLabel>
                <Select
                  required
                  className={classes.select}
                  onChange={this.handleChange}
                  value={this.transfersEnabled}
                  input={<Input name="transfersEnabled" id="transfersEnabled" />}
                >
                  <MenuItem value={false}>Disabled</MenuItem>
                  <MenuItem value={true}>Enabled</MenuItem>
                </Select>
              </div>
            </Grid>
            <Grid item xs={12} >
              <CustomButton raised={true} type="submit" content="Add" disabled={this.loading}/>
              { this.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
            </Grid>
          </Grid>
        </form>
        {
          this.getAddress() &&
          (
            <Grid container spacing={16} >
              <Grid item xs={12} >
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <div className={classes.tokenAddress}>
                  <Typography className={classes.typography} type="subheading" noWrap>
                    {'Your token address is:'}
                  </Typography>
                  <Typography type="body2" color='primary' noWrap>
                    {this.getAddress()[0]}
                  </Typography>
                  <Typography type="body2" color='primary' noWrap>
                    {this.getAddress()[1]}
                  </Typography>
                </div>
              </Grid>
            </Grid>
          )
        }
      </div>
    );
  }

  @action
  handleChange = e => {
    this[e.target.name] = e.target.value;
  }

  @action
  handleFormSubmit = e => {
    e.preventDefault();
    this.loading = true;

    const deploymentOptions = {
        parentToken: 0,
        parentSnapShotBlock: 0,
        tokenName: this.tokenName,
        decimalUnits: this.decimalUnits,
        tokenSymbol: this.tokenSymbol,
        transfersEnabled: this.transfersEnabled,
    };
    DeployContract.deploy(deploymentOptions)
        .then((addresses) => {
            console.log(addresses);
            this.loading = false;
            Session.setItem('tokenAddress', addresses[1]);
            Session.setItem('tokenFactoryAddress', addresses[0]);
        })
        .catch((err) => {
            this.loading = false;
        });
  };
}

NewToken.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(NewToken);
