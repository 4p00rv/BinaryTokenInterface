import * as Cookies from "js-cookie";
import { observable, computed, action } from 'mobx';

let instance = null;

class SessionStorage {
    cookie_name = 'contract';
    @observable storage = new Map();

    constructor() {
        if(!instance) instance = this;
        const stored_cookie = Cookies.get(this.cookie_name);
        if(stored_cookie) {
            instance.storage.merge(JSON.parse(stored_cookie));
        }
    }

    @action
    setItem(...args) {
      if(typeof args[0] === 'object') {
        instance.storage.merge(args[0]);
      } else {
        instance.storage.set(...args);
      }
      Cookies.set(instance.cookie_name, instance.storage.toJSON());
    }

    @action
    removeSession() {
        Cookies.remove(instance.cookie_name);
        instance.storage.clear();
        return instance.storage;
    }
}

export default new SessionStorage();
