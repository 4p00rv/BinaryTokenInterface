import { observable, action } from "mobx";

import MenuItem from "./MenuItemModel";

export default class Menu {
  @observable items = [];

  @action
  clear() {
    this.items.forEach((e) => {e.selected = false;});
  }

  selectedMenuItem () {
    return this.items.filter(e => e.selected);
  }

  @action
  add(name, icon, selected) {
    this.items.push(new MenuItem(name, icon, selected));
  }
}
