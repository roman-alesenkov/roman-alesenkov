import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';
import LoginConstants from '../constants/LoginConstants';
import assign from 'object-assign';
import ConfigConstants from '../constants/ConfigConstants';
import $ from 'jquery';

let BASE_URL = ConfigConstants.BASE_URL;

const CHANGE_EVENT = 'change';

let isLogged = null;
let currentUser = {
  name: null,
  id: null
};

const LoginStore = assign({}, EventEmitter.prototype, {

  loginWithFacebook() {
    window.location.href = BASE_URL + '/login/facebook';
    this.emitChange();
  },

  fetchCurrentUser() {
    $.ajax({
      url: BASE_URL + '/current-user',
      withCredentials: true,
      dataType: 'json',
      success: function (data) {
        isLogged = true;
        currentUser = data;
        this.emit(CHANGE_EVENT);
      }.bind(this)
    });
  },

  getCurrentUser () {
    return currentUser;
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

    case LoginConstants.AUTH_LOGIN_WITH_FACEBOOK:
      LoginStore.loginWithFacebook();
      break;

    case LoginConstants.AUTH_LOGOUT:

      break;

    default:

  }
});

module.exports = LoginStore;
