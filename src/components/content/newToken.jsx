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
// import { deploy as DeployContract } from '../../minime/js/deploy_contracts';

const styles = theme => {
  console.log(theme);
  return ({
  card: {
    height: 100
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    background: theme.palette.background.paper,
    borderRadius: 3,
    boxShadow: theme.shadows[4],
    padding: 10,
    width: '90%',
    height: '85%',
    margin: 'auto'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '90%',
  },
  tokenAddress: {
    textAlign: 'center',
    padding: '10 20 15 20',
    // boxShadow: theme.shadows[1],
    maxHeight: 70,
  },
  typography: {
    marginBottom: 10,
    fontSize: theme.typography.pxToRem(16),
  },
  select: {
    display: 'block',
  },
  inputSelect: {
    width: '90%',
    margin: '17 10 0',
  }
})};

@observer
class NewToken extends React.Component {
  @observable tokenAddress = '';
  @observable tokenName;
  @observable transfersEnabled=true;
  @observable decimalUnits=18;
  @observable tokenSymbol;

  render () {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <form onSubmit={this.handleFormSubmit} style={{height: 300}}>
          <Grid container spacing={16} className={classes.root}>
            <Grid item key="Subheader" xs={12} style={{ height: 50 }}>
              <Subheader component="div">Create New Token</Subheader>
            </Grid>
            <Grid item sm={6} md={3}>
              <TextField
                id="name"
                label="Token name"
                className={classes.textField}
                margin="normal"
                required={true}
              />
            </Grid>
            <Grid item sm={6} md={3}>
              <TextField
                id="decimalUnits"
                label="Decimal units"
                className={classes.textField}
                margin="normal"
                type="number"
                required={true}
              />
            </Grid>
            <Grid item sm={6} md={3}>
              <TextField
                id="symbol"
                label="Token symbol"
                className={classes.textField}
                margin="normal"
                required={true}
              />
            </Grid>

            <Grid item sm={6} md={3}>
              <div className={classes.inputSelect}>
                <InputLabel htmlFor="age-helper" required>Tranfers Enabled</InputLabel>
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
              <CustomButton type="submit" classes={{button:'floatRight'}}/>
            </Grid>
          </Grid>
        </form>
        {
          this.tokenAddress &&
          (
            <div className={classes.tokenAddress}>
              <Typography className={classes.typography} type="body1" noWrap>
                {'Your token address is:'}
              </Typography>
              <Typography type="title" color='primary' noWrap>
                {this.tokenAddress}
              </Typography>
            </div>
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
    const deploymentOptions = {
        parentToken: 0,
        parentSnapShotBlock: 0,
        tokenName: this.tokenName,
        decimalUnits: this.decimalUnits,
        tokenSymbol: this.symbol,
        transfersEnabled: true,
    };
    // DeployContract(deploymentOptions).then((addresses) => {
    //     console.log(addresses);
    //     this.tokenAddress = `${addresses[1]} (${addresses[0]})`;
    // });
    e.preventDefault();
  };
}

NewToken.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(NewToken);
