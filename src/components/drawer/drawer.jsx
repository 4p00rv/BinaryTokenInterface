import React from 'react';
import { observable, computed, action } from 'mobx';
import { observer } from "mobx-react";
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import Tooltip from 'material-ui/Tooltip';

import BinaryIcon from '../common/BinaryIcon';
import DrawerStyle from '../styles/drawerStyle';
import Menu from './menu/list';
import menuModel from '../../models/MenuModel';
import NewTokenContent from '../content/newToken';

/* Create menu items */
const menu = new menuModel();
menu.add('New Token', 'create', true);
menu.add('Transfer', 'send');

@observer
class MiniDrawer extends React.Component {
  @observable open = false;

  @action
  handleDrawerOpen = () => {
    this.open = true;
  };

  @action
  handleDrawerClose = () => {
    this.open = false;
  };

  @computed
  get content () {
    const item = menu.selectedMenuItem();
    if(item && item.length) {
        if(item[0].icon === 'create') {
          return (
            <NewTokenContent />
          );
        }
        if(item[0].icon === 'send') {
          return (
            <Typography type="body1" noWrap>
              {'Transfer token'}
            </Typography>
          );
        }
    }
  }

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar className={classNames(classes.appBar, this.open && classes.appBarShift)}>
            <Toolbar disableGutters={!this.open}>
              <Tooltip id="tooltip-icon" title="Open drawer" placement="bottom">
                <IconButton
                  color="contrast"
                  aria-label="open drawer"
                  onClick={this.handleDrawerOpen}
                  className={classNames(classes.menuButton, this.open && classes.hide)}
                >
                  <BinaryIcon/>
                </IconButton>
              </Tooltip>
              <Typography type="title" color="inherit" noWrap>
                Binary Token
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            type="permanent"
            classes={{
              paper: classNames(classes.drawerPaper, !this.open && classes.drawerPaperClose),
            }}
            open={this.open}
          >
            <div className={classes.drawerInner}>
              <div className={classes.drawerHeader}>
                <IconButton onClick={this.handleDrawerClose}>
                  <Tooltip id="tooltip-icon" title="Close drawer" placement="bottom"
                    PopperProps = {{style: {width: 80}}}
                  >
                    <ChevronLeftIcon />
                  </Tooltip>
                </IconButton>
              </div>
              <Divider />
              <Menu menu={menu} className={classes.list} />
              <Divider />
            </div>
          </Drawer>
          <main className={classes.content}>
            {this.content}
          </main>
        </div>
      </div>
    );
  }
}

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(DrawerStyle, { withTheme: true })(MiniDrawer);
