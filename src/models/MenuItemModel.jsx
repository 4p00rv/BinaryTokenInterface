import { observable, computed } from "mobx";
import React from 'react';
import CreateIcon from 'material-ui-icons/Create';
import SendIcon from 'material-ui-icons/Send';
import TokenIcon from 'material-ui-icons/MonetizationOn';

let i = 0;

export default class MenuItem {
  id = Math.random();
  @observable name;
  @observable icon;
  @observable selected;

  constructor(name, icon, selected = false) {
    this.name = name;
    this.icon = icon;
    this.selected = selected;
  }

  @computed
  get Icon () {
    const icons = {
        create: (<CreateIcon />),
        send: (<SendIcon />),
        token: (<TokenIcon />),
    };

    return icons[this.icon];
  }
}
