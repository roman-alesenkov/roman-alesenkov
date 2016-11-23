import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';
import ContactConstants from '../constants/ContactConstants';
import assign from 'object-assign';


const CHANGE_EVENT = 'change';

let isLogged = null;

const AuthStore = assign({}, EventEmitter.prototype, {

  login(login, password) {
    if (login === 'user' && password === 'user') {
      isLogged = true;
      this.emitChange();
    }
  },

  logout() {
    isLogged = false;
    this.emitChange();
  },

  isLogged() {
    return isLogged;
  },

  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

});

AppDispatcher.register((action) => {
  switch (action.actionType) {

    case ContactConstants.AUTH_LOGIN:

      break;

    case ContactConstants.AUTH_LOGIOUT:

      break;

    default:

  }
});

module.exports = AuthStore;
