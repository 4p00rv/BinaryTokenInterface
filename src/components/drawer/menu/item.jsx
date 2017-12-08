import React from 'react';
import { observer } from "mobx-react";
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { MenuItem } from 'material-ui/Menu';
import classNames from 'classnames';

const styles = theme => ({
  menuItem: {
    '&.active': {
      background: theme.palette.secondary[500],
      '& $text, & $icon': {
        color: theme.palette.common.white,
      },
    },
  },
  text: {},
  icon: {},
});

@observer
class Item extends React.Component {

  render() {
    const { classes, item } = this.props;
    return (
      <MenuItem
        className={classNames(classes.menuItem, item.selected && "active")}
        onClick={() => { this.props.menu.clear(); item.selected = true;}}>
        <ListItemIcon className={classes.icon}>
          { item.Icon }
        </ListItemIcon>
        <ListItemText classes={{ text: classes.text }} inset primary={item.name} />
      </MenuItem>
    );
  }
}

Item.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Item);
