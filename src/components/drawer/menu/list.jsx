import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { MenuList } from 'material-ui/Menu';

import Item from './item';

const styles =  theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    background: theme.palette.background.paper,
  },
});

function SimpleList (props){
  const { classes } = props;
  return(
    <div className={classes.root}>
      <MenuList>
        {props.menu.items.map(item => (
          <Item item={item} key={item.id} menu={props.menu}/>
        ))}
      </MenuList>
    </div>
  );
}

SimpleList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleList);
