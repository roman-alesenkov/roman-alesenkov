import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';
import ContactConstants from '../constants/ContactConstants';
import assign from 'object-assign';
import $ from 'jquery';


const CHANGE_EVENT = 'change';
//let BASE_URL = 'https://node-api-rhaibevozn.now.sh/api';
//let BASE_URL = 'http://localhost:8080/api';
let BASE_URL = 'https://floating-dusk-14900.herokuapp.com/api';

let contactList = [];
let profile = null;
let editableProfile = {};

function updateEditableProfileText(type, value) {
  editableProfile[type] = value;
}

const ContactListStore = assign({}, EventEmitter.prototype, {

  getAll() {
    return contactList;
  },

  clearProfileInfo() {
    editableProfile = {};
    profile = {};
  },

  fetchAll() {
      $.ajax({
        url: BASE_URL + '/users',
        withCredentials: true,
        dataType: 'json',
        success: function (data) {
          contactList = data;
          this.emit(CHANGE_EVENT);
        }.bind(this)
      });
  },

  getCurrentProfile() {
    return profile;
  },

  destroyById(id) {
    $.ajax({
      type: 'DELETE',
      url: BASE_URL + '/user/' + id,
      withCredentials: true,
      dataType: 'json',
      success: function (data) {
        this.fetchAll();
      }.bind(this)
    });
  },

  saveProfile() {
    let url;
    let type;

    if (editableProfile.id) {
      url = BASE_URL + '/user/' + editableProfile.id;
      type = 'PUT';
    } else {
      url = BASE_URL + '/users';
      type = 'POST';
    }

    editableProfile.sex = editableProfile.sex || 'male';

    $.ajax({
      url: url,
      type: type,
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(editableProfile),
      success: function () {
        if (!editableProfile.id) {
          this.clearProfileInfo();
        }
        this.emit(CHANGE_EVENT);
      }.bind(this)
    });
  },

  fetchUserById(id) {
    this.clearProfileInfo();
    this.emit(CHANGE_EVENT);
    $.ajax({
      //url: `${BASE_URL}?results=1&inc=login,name,gender,email,location,picture,phone`,
      url: BASE_URL + '/user/' + id,
      dataType: 'json',
      success: function (data) {
        profile = data;
        editableProfile = profile;
        this.emit(CHANGE_EVENT);
      }.bind(this)
    });
  },

  getFilterState() {
    return {
      gender,
      searchString,
    };
  },

  getBaseUrl() {
    return BASE_URL;
  },

  saveBaseUrl(baseUrl) {
    BASE_URL = baseUrl;
  },

  downloadUserList() {
    window.open(BASE_URL + '/reports/users');
  },

  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
});

AppDispatcher.register((action) => {
  switch (action.actionType) {

    case ContactConstants.CONTACT_FILTER:
      searchString = action.searchString;
      ContactListStore.emitChange();
      break;

    case ContactConstants.CONTACT_FILTER_BY_GENDER:
      gender[action.gender] = action.checked;
      ContactListStore.emitChange();
      break;

    case ContactConstants.CONTACT_SORT:
      sortCriteria = {
        name: action.name,
        ascendant: action.ascendant,
      };
      ContactListStore.emitChange();
      break;

    case ContactConstants.CONTACT_DESTROY:
      destroyById(action.id);
      ContactListStore.emitChange();
      break;

    case ContactConstants.CONTACT_UPDATE_EDITABLE_TEXT:
      updateEditableProfileText(action.type, action.value);
      break;

    case ContactConstants.CONTACT_SAVE:
      ContactListStore.saveProfile();
      ContactListStore.emitChange();
      break;

    case ContactConstants.BASE_URL_SAVE:
      ContactListStore.saveBaseUrl(action.baseUrl);
      ContactListStore.fetchAll();
      break;

    default:

  }
});

module.exports = ContactListStore;
